import { Injectable, Logger } from '@nestjs/common';
import { GetOrderDto, OrderDetailDto, OrderQueryDto } from './dto/get-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Like, Repository } from 'typeorm';
import { OrderEntity } from '~/modules/supplier/order/entities/order.entity';
import { Pagination } from '~/helper/paginate/pagination';
import { paginate } from '~/helper/paginate';
import { DeliveryService } from '~/modules/supplier/delivery/delivery.service';
import { OrderStatus } from '~/modules/supplier/enum/Order';
import { OrderItemEntity } from '~/modules/supplier/order/entities/orderItem.entity';
import {
  ContactPerson,
  OrderSendDetailDto,
  OrderSendItemDto,
  OrderSendSecondDto,
  OrderSendSubmit
} from '~/modules/supplier/order/dto/order-submit.dto';
import dayjs from 'dayjs';
import { entries, isEmpty } from 'lodash';
import { createDeliveryBh } from '~/utils/delivery.util';
import { DeliveryEntity } from '~/modules/supplier/delivery/entities/delivery.entity';
import { DeliveryStatus } from '~/modules/supplier/enum/Delivery';
import { DeliveryItemEntity } from '~/modules/supplier/delivery/entities/deliveryItem.entity';
import { DeliverySecondDetailEntity } from '~/modules/supplier/delivery/entities/deliverySecondDetail.entity';
import { DeliveryPersonHistoryEntity } from '~/modules/supplier/delivery/entities/deliveryPersonHistory.entity';

@Injectable()
export class OrderService {
  
  private logger = new Logger(OrderService.name)
  
  constructor(
    private readonly deliveryService: DeliveryService,
    @InjectRepository(OrderEntity)
    private readonly orderEntity: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemEntity: Repository<OrderItemEntity>,
    @InjectRepository(DeliveryEntity)
    private readonly deliveryEntity: Repository<DeliveryEntity>,
    @InjectRepository(DeliveryItemEntity)
    private readonly deliveryItemEntity: Repository<DeliveryItemEntity>,
    @InjectRepository(DeliverySecondDetailEntity)
    private readonly deliverySecondDetailEntity: Repository<DeliverySecondDetailEntity>,
    @InjectRepository(DeliveryPersonHistoryEntity)
    private readonly historyEntity: Repository<DeliveryPersonHistoryEntity>,
  ) {
  }
  
  async getOrderListByPage(
    {
      page,
      pageSize,
      supplierId,
      search,
      orderStatus,
      startAmount,
      endAmount,
      startDate,
      endDate,
      order,
      orderBh
    }: OrderQueryDto
  ) {
    
    const queryBuilder = this.orderEntity
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItem', 'orderItem')
      .where({
        ...{ supplierId },
        ...(search ? { orderBh: Like(`%${ search }%`) } : {}),
        ...(orderBh ? { orderBh: Like(`%${ orderBh }%`) } : {}),
        ...(orderStatus ? { orderStatus } : {}),
        ...(startAmount && endAmount ? { orderAmount: Between(startAmount, endAmount) } : {}),
        ...(startDate && endDate ? { orderTime: Between(startDate, endDate) } : {}),
      })
      .orderBy('order.orderTime', order || 'DESC')
    
    return paginate<OrderEntity>(queryBuilder, { page, pageSize })
  }
  
  
  async findOneByOrderBh({ orderBh, supplierId }: OrderDetailDto) {
    
    const queryBuilder = await this.orderEntity
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItem', 'orderItem')
      .leftJoinAndSelect('order.orderDeliverys', 'orderDelivery')
      .where({ orderBh, supplierId })
      .getOne()
    
    const resultMap = new Map<string, any>()
    resultMap.set('order', queryBuilder)
    const deliverys = queryBuilder && queryBuilder.orderDeliverys
    
    if (deliverys && deliverys.length > 0) {
      const deliveryBhs = [...new Set(deliverys.map(item => item.deliveryBh))]
      const deliveryList =
        await this.deliveryService.getDeliverysById(deliveryBhs, supplierId)
      resultMap.set('deliveryList', deliveryList)
    } else {
      resultMap.set('deliveryList', [])
    }
    
    return resultMap
  }
  
  async checkOrder({ supplierId, orderBh }: OrderDetailDto) {
    if (!orderBh) {
      throw new Error('订单编号不能为空')
    }
    
    const orderBhs: string[] = orderBh.split(',')
    const orders = await this.orderEntity
      .createQueryBuilder('order')
      .where({
        supplierId,
        orderBh: In(orderBhs)
      })
      .getMany()
    
    if (!orders || orders.length === 0) {
      throw new Error('未查询到相关订单信息')
    }
    
    const findOrder = orders.find(order => order.orderStatus === OrderStatus.STOP)
    if (findOrder) {
      throw new Error(findOrder.orderBh + '已被阻断')
    }
    
    return orders
  }
  
  async getWaitSendOrderItemListByPage({ supplierId, orderBh }: OrderDetailDto) {
    
    const orders = await this.checkOrder({ supplierId, orderBh })
    if (!orders || orders.length === 0) {
      throw new Error('')
    }
    
    const orderBhs = orders
      .filter(order => order.orderStatus === OrderStatus.WAITSEND)
      .map(order => order.orderBh)
    
    const queryBuilder = await this.orderItemEntity
      .createQueryBuilder('i')
      .where(qb => {
        
        const subQuery = qb
          .subQuery()
          .select('distinct item.order_item_id')
          .from(OrderItemEntity, 'item')
          .where('item.num - item.delivery_num > 0')
          .andWhere('item.order_bh IN (:...orderBh)', { orderBh: orderBhs })
          .getQuery()
        
        return 'i.order_item_id IN ' + subQuery
      })
      .addGroupBy('i.product_id')
      .addGroupBy('i.product_code')
      .addGroupBy('i.product_model')
      .addGroupBy('i.specs')
      .addGroupBy('i.price')
      .getMany()
    
    return queryBuilder
  }
  
  async orderSendSubmit(orderSendSubmit: OrderSendSubmit) {
    const {
      supplierId,
      orderBh,
      resultList,
      contactPerson,
      remark
    } = orderSendSubmit
    
    const orders = await this.checkOrder({ supplierId, orderBh })
    if (!orders || orders.length === 0) {
      throw new Error('')
    }
    
    // 校验订单明细列表发货数量
    const [totalNum, totalPrice] = await this.checkOrderItemDetail(resultList, supplierId)
    
    // 生成送货单
    const deliveryBh = createDeliveryBh()
    const order = orders[0]
    await this.createDelivery(supplierId, order, contactPerson, remark, totalNum, totalPrice, deliveryBh)
    
    // 生成一级明细
    await this.createDeliveryItem(supplierId, order, resultList, deliveryBh)
    
    // 修改订单明细及状态
    await this.updateOrderItemAndStatus(resultList, orderBh, supplierId)
    
    // 保存送货人
    await this.saveDeliveryPerson(supplierId, contactPerson)
    
  }
  
  async checkOrderItemDetail(resultList: OrderSendItemDto[], supplierId: number) {
    
    const curDate = dayjs().format('YYYY-MM-DD')
    let totalNum = 0
    let totalPrice = 0
    for (let resultItem of resultList) {
      const orderItem = resultItem.item
      const productName = orderItem.productName
      const selectList = resultItem.selectList
      if (!selectList && selectList.length === 0) {
        throw new Error(`${ productName }发货明细不能为空`)
      }
      
      const orderItemRes = await this.orderItemEntity.findOneBy({ orderItemId: orderItem.orderItemId })
      if (!orderItemRes) {
        throw new Error(`${ productName }明细不存在`)
      }
      
      const sendNum = selectList.reduce((pre, cur) => pre + cur.sendNum, 0)
      if (orderItemRes.num === orderItemRes.deliveryNum
        || (orderItemRes.num - orderItemRes.deliveryNum) < sendNum) {
        throw new Error(`${ productName }明细发货数量不能大于待发货数量`)
      }
      
      if (selectList.find(item => dayjs(item.validDate, 'YYYY-MM-DD').isBefore(curDate))) {
        throw new Error(`产品${ productName }有效期不能小于当前日期`)
      }
      
      for (let orderSendDetail of selectList) {
        const { secondSnList } = orderSendDetail
        if (orderItem.detailFlag == '1') {
          if (!secondSnList && secondSnList.length === 0) {
            throw new Error(`${ productName }二级明细条码不能为空`)
          }
          
          const checkSecondSnResult = this.checkSecondSn(secondSnList, orderItem.labelFlag)
          if (!checkSecondSnResult.result) {
            throw new Error(`${ productName }明细中条码${ checkSecondSnResult.index + checkSecondSnResult.msg }`)
          }
        }
      }
      
      // 计算数量及送货单金额
      totalPrice = selectList.reduce((p, c) => p + c.sendNum * c.inPrice, totalPrice)
      totalNum += selectList.length
    }
    
    return [totalNum, totalPrice]
  }
  
  checkSecondSn(secondSnList: OrderSendSecondDto[], labelFlag: string) {
    
    const resObj = { index: 0, result: true, msg: '' }
    const tempSnList = new Set<string>()
    for (let [index, secondSn] of entries(secondSnList)) {
      const mainBarCode = secondSn.mainBarCode.trim()
      if (!secondSn.mainBarCode.trim()) {
        resObj.msg = '主条码不能为空'
        resObj.index = Number(index)
        resObj.result = false
        break
      }
      
      const secondBarCode = secondSn.secondBarCode.trim()
      const sn = mainBarCode + secondBarCode
      if (tempSnList.has(sn) && labelFlag === '1') {
        resObj.msg = '主条码不能为空'
        resObj.index = Number(index)
        resObj.result = false
        break
      }
      tempSnList.add(sn)
      
      if (mainBarCode && secondBarCode
        && (mainBarCode.indexOf(secondBarCode) != -1 || secondBarCode.indexOf(mainBarCode) != -1)) {
        resObj.msg = '主副条码不能包含，优先录入主条码'
        resObj.index = Number(index)
        resObj.result = false
        break
      }
    }
    
    return resObj
  }
  
  async createDelivery(supplierId: number, order: OrderEntity, contactPerson: ContactPerson, remark: string,
                       totalNum: number, totalPrice: number, deliveryBh: string) {
    const delivery = new DeliveryEntity()
    delivery.supplierId = supplierId.toString()
    delivery.deliveryBh = deliveryBh
    delivery.supplierSimpleName = order.supplierSimpleName
    delivery.deliverUser = contactPerson.contactPersonName.trim() + ' (' + contactPerson.contactInfo.trim() + ')'
    delivery.remark = remark
    delivery.hospitalId = order.hospitalId
    delivery.hospitalName = order.hospitalName
    delivery.hospitalSimpleName = order.hospitalSimpleName
    delivery.areaCode = order.areaCode
    delivery.areaName = order.areaName
    delivery.deptCode = order.deptCode
    delivery.deptName = order.deptName
    delivery.deliverStatus = DeliveryStatus.PENDING
    delivery.totalAmount = totalPrice.toString()
    delivery.totalNum = totalNum
    await this.deliveryEntity.insert(delivery)
  }
  
  async createDeliveryItem(supplierId: number, order: OrderEntity, resultList: OrderSendItemDto[], deliveryBh: string) {
    
    for (const items of resultList) {
      const deliveryItem = new DeliveryItemEntity()
      const { item, selectList } = items
      deliveryItem.deliveryBh = deliveryBh
      deliveryItem.applicationDept = item.applicationDept
      deliveryItem.num = selectList.reduce((pre, cur) => pre + cur.sendNum, 0)
      deliveryItem.price = selectList.reduce((pre, cur) => pre + cur.sendNum * cur.inPrice, 0).toString()
      deliveryItem.productId = item.productId
      deliveryItem.useNum = 0
      deliveryItem.invoiceNum = 0
      deliveryItem.invoiceStatus = 0
      deliveryItem.supplierId = item.supplierId
      deliveryItem.invoiceStatus = DeliveryStatus.PENDING
      deliveryItem.fpFlag = 0
      deliveryItem.labelFlag = item.labelFlag
      deliveryItem.onLineFlag = item.onLineFlag
      deliveryItem.areaCode = order.areaCode
      deliveryItem.areaName = order.areaName
      deliveryItem.deptCode = order.deptCode
      deliveryItem.deptName = order.deptName
      deliveryItem.minUnit = item.minUnit
      
      const res = await this.deliveryItemEntity.insert(deliveryItem)
      if (res.raw != 1) {
        throw new Error(`${ item.productName }明细保存失败`)
      }
      // 生成二级明细
      if (item.detailFlag === '1') {
        const itemId = res.generatedMaps['delivery_item_id']
        
        // TODO
        const secondDetailPool: DeliverySecondDetailEntity[] = []
        for (let orderSendDetail of selectList) {
          const { secondSnList } = orderSendDetail
          for (let secondSn of secondSnList) {
            const secondItem = new DeliverySecondDetailEntity()
            secondItem.deliveryBh = deliveryBh
            secondItem.deliveryItemId = itemId
            secondItem.udiDiBh = item.udiDiBh
            secondItem.productCode = item.productCode
            secondItem.productName = item.productName
            secondItem.productStandardName = item.productStandardName
            secondItem.productStandardCode = item.productStandardCode
            secondItem.specs = item.specs
            secondItem.productModel = item.productModel
            secondItem.productUnit = item.productUnit
            secondItem.packageUnit = item.packageUnit
            secondItem.inPrice = orderSendDetail.inPrice.toString()
            secondItem.salePrice = orderSendDetail.salePrice.toString()
            secondItem.invoiceStatus = 0
            secondItem.detailStatus = '0'
            secondItem.supplierId = supplierId.toString()
            secondItem.batchBh = orderSendDetail.batchBh
            secondItem.validDate = orderSendDetail.validDate
            secondItem.useNum = orderSendDetail.sendNum
            secondItem.mainBarCode = secondSn.mainBarCode.trim()
            secondItem.secondBarCode = secondSn.secondBarCode.trim()
            secondItem.sn = secondItem.mainBarCode + secondItem.secondBarCode
            secondItem.areaCode = order.areaCode
            secondItem.areaName = order.areaName
            secondItem.deptCode = order.deptCode
            // TODO
            secondItem.hospitalBarCode = secondItem.sn
            // secondItem.hospitalBarCode = item.labelFlag === '1' ? '' : secondItem.sn
            secondDetailPool.push(secondItem)
          }
        }
        
        await this.deliverySecondDetailEntity.insert(secondDetailPool)
      }
    }
  }
  
  private async updateOrderItemAndStatus(resultList: OrderSendItemDto[], orderBh: string, supplierId: number) {
    
    // TODO
    const orderItemPool: OrderItemEntity[] = []
    for (let orderItem of resultList) {
      const { item, selectList } = orderItem
      const deliveryNum = selectList.reduce((pre, cur) => pre + cur.sendNum, 0)
      // const orderItemEntity = new OrderItemEntity()
      // orderItemEntity.orderItemId = item.orderItemId
      // orderItemEntity.deliveryNum = deliveryNum
      // orderItemPool.push(orderItemEntity)
      await this.orderItemEntity
        .createQueryBuilder()
        .update(OrderItemEntity)
        .set({ deliveryNum: () => 'delivery_num + ' + deliveryNum })
        .where({ orderItemId: item.orderItemId })
        .execute()
    }
    
    const orderMap = await this.findOneByOrderBh({ orderBh, supplierId })
    const orderItem = orderMap.get('order').orderItem
    
    if (orderItem.every((i: OrderItemEntity) => i.deliveryNum === i.num)) {
      await this.orderEntity
        .createQueryBuilder()
        .update(OrderEntity)
        .set({ orderStatus: OrderStatus.FINISH })
        .where({ orderBh })
        .execute()
    }
    
  }
  
  private async saveDeliveryPerson(supplierId: number, { contactInfo, contactPersonName }: ContactPerson) {
    const person = await this.historyEntity
      .createQueryBuilder()
      .where({
        supplierId,
        deliveryContactInfo: contactInfo
      })
      .getOne()
    
    const history = new DeliveryPersonHistoryEntity()
    if (isEmpty(person)) {
      history.supplierId = supplierId.toString()
      history.deliveryContactInfo = contactInfo
      history.deliveryPersonName = contactPersonName
      await this.historyEntity.insert(history)
      return
    }
    
    if (person.deliveryPersonName != contactPersonName) {
      await this.historyEntity
        .createQueryBuilder()
        .update(DeliveryPersonHistoryEntity)
        .set({ deliveryPersonName: contactPersonName })
        .where({ contactInfo, supplierId })
        .execute()
    }
  }
  
}
