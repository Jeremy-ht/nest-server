import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Between, EntityManager, In, Like, Repository } from 'typeorm';
import { DeliveryEntity } from '~/modules/supplier/delivery/entities/delivery.entity';
import { isEmpty, isNil } from 'lodash';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import {
  DeliveryDetailDto,
  DeliveryQueryDto,
  DeliverySecondDto
} from '~/modules/supplier/delivery/dto/get-delivery.dto';
import { paginate } from '~/helper/paginate';
import { CancelDeliveryStatus, DeliveryStatus } from '~/modules/supplier/enum/Delivery';
import { DeliverySecondDetailEntity } from '~/modules/supplier/delivery/entities/deliverySecondDetail.entity';
import { DeliveryItemEntity } from '~/modules/supplier/delivery/entities/deliveryItem.entity';
import { OrderDeliveryRelationEntity } from '~/modules/supplier/order/entities/orderDeliveryRelation.entity';
import { OrderEntity } from '~/modules/supplier/order/entities/order.entity';
import { OrderItemEntity } from '~/modules/supplier/order/entities/orderItem.entity';
import { OrderStatus } from '~/modules/supplier/enum/Order';
import { DeliveryStatusRecordEntity } from '~/modules/supplier/delivery/entities/deliveryStatusRecord.entity';

@Injectable()
export class DeliveryService {

  constructor(
    @InjectRepository(DeliveryEntity)
    private readonly deliveryEntity: Repository<DeliveryEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderEntity: Repository<OrderEntity>,
    @InjectRepository(DeliveryItemEntity)
    private readonly deliveryItemEntity: Repository<DeliveryItemEntity>,
    @InjectRepository(DeliverySecondDetailEntity)
    private readonly secondDetailEntity: Repository<DeliverySecondDetailEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemEntity: Repository<OrderItemEntity>,
    @InjectRepository(DeliveryStatusRecordEntity)
    private deliveryStatusRecordEntity: Repository<DeliveryStatusRecordEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {
  }


  /**
   * 获取送货单单个详情
   * @param deliveryBh
   * @param supplierId
   */
  async getDeliveryDetailById(deliveryBh: string, supplierId: number) {
    if (isNil(deliveryBh)) {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: '送货单号不能为空',
      });
    }

    if (isNil(supplierId)) {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: '供应商id不能为空',
      });
    }

    return await this.deliveryEntity
      .createQueryBuilder('delivery')
      .where({
        deliveryBh,
        supplierId
      })
      .getOne()

  }


  /**
   * 获取多个送货单详情
   * @param deliveryBhs
   * @param supplierId
   */
  async getDeliverysById(deliveryBhs: string[], supplierId: number) {
    if (deliveryBhs.length === 0) {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: '送货单号不能为空',
      });
    }

    if (isNil(supplierId)) {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: '供应商id不能为空',
      });
    }

    return await this.deliveryEntity
      .createQueryBuilder('delivery')
      .where({
        deliveryBh: In(deliveryBhs),
        supplierId
      })
      .getMany()
  }


  getDeliveryListByPage(
    {supplierId, search, startAmount, endAmount, startTime, endTime, page, pageSize, order}: DeliveryQueryDto
  ) {

    const query = this.deliveryEntity
      .createQueryBuilder('delivery')
      .where({
        ...{supplierId},
        ...(search ? {deliveryBh: Like(`%${search}%`)} : {}),
        ...(startAmount && endAmount ? {totalAmount: Between(startAmount, endAmount)} : {}),
        ...(startTime && endTime ? {createTime: Between(startTime, endTime)} : {})
      })
      .orderBy('delivery.createTime', order || 'DESC')


    return paginate(query, {page, pageSize})
  }

  async findOneByDeliveryBh({supplierId, deliveryBh}: DeliveryDetailDto) {

    // 使用没用实体映射方式连接查询
    return await this.deliveryEntity
      .createQueryBuilder('delivery')
      .leftJoinAndMapMany(
        'delivery.deliveryItems',
        DeliveryItemEntity,
        'item',
        'item.deliveryBh = delivery.deliveryBh'
      )
      .leftJoinAndMapMany(
        'item.deliverySecondDetail',
        DeliverySecondDetailEntity,
        'secondDetail',
        'secondDetail.deliveryItemId = item.deliveryItemId'
      )
      .where({supplierId, deliveryBh})
      .getOne()
  }

  async cancelDelivery({supplierId, deliveryBh}: DeliveryDetailDto) {

    const delivery = await this.deliveryEntity
      .createQueryBuilder('delivery')
      .leftJoinAndMapMany(
        'delivery.deliveryItems',
        DeliveryItemEntity,
        'deliveryItem',
        'deliveryItem.deliveryBh = delivery.deliveryBh'
      )
      .where({supplierId, deliveryBh})
      .getOne()


    if (isEmpty(delivery)) {
      throw new Error('未找到该送货单');
    }

    if (!CancelDeliveryStatus.includes(delivery.deliverStatus)) {
      throw new Error('送货单不可取消');
    }

    // 查询关联订单信息
    const orders = await this.orderEntity
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItem', 'orderItem')
      .where(qb => {
        const subQur = qb
          .subQuery()
          .select('DISTINCT relation.orderItemId')
          .from(OrderDeliveryRelationEntity, 'relation')
          .where({deliveryBh})
          .getQuery()

        return 'orderItem.orderItemId IN ' + subQur
      })
      .getMany()

    if (orders && orders.length === 0) {
      throw new Error('未找到该送货单关联订单');
    }

    const deliveryItems = delivery.deliveryItems
    // 待更新订单明细池
    // const updOrderItems: OrderItemEntity[] = []
    const updOrders = new Set<string>

    await this.entityManager.transaction(async (manager) => {

      // 遍历送货单明细，更新订单发货数量
      orders.forEach(order => {
        order.orderItem.forEach(async orderItem => {
          const deliveryItem = deliveryItems.find(deliveryItem => deliveryItem.productId == orderItem.productId)
          // 计算方法错误  应该把多个批号的数量相加  TODO
          const items = deliveryItems.filter(deliveryItem => deliveryItem.productId === orderItem.productId)
          if (deliveryItem) {

            if (orderItem.deliveryNum <= deliveryItem.num) {
              orderItem.deliveryNum = 0
            } else {
              orderItem.deliveryNum -= deliveryItem.num
            }

            // updOrderItems.push(orderItem)
            const updRes = await manager
              .createQueryBuilder()
              .update(OrderItemEntity)
              .set({deliveryNum: orderItem.deliveryNum})
              .where({orderItemId: orderItem.orderItemId})
              .execute()

            if (updRes.affected === 0) {
              throw new Error('更新订单明细失败')
            }

            updOrders.add(order.orderBh)
          }

        })
      })

      // 更新订单状态
      if (updOrders.size != 0) {
        for (let orderBh of updOrders) {
          const updRes = await manager
            .createQueryBuilder()
            .update(OrderEntity)
            .set({orderBh})
            .where({orderStatus: OrderStatus.WAITSEND})
            .execute()

          if (updRes.affected === 0) {
            throw new Error('更新订单明细失败')
          }
        }
      }

      // 更新送货单状态
      const updDeliveryRes = await manager
        .createQueryBuilder()
        .update(DeliveryEntity)
        .set({deliverStatus: DeliveryStatus.CANCELED})
        .where({supplierId, deliveryBh})
        .execute()
      if (updDeliveryRes.affected === 0) {
        throw new Error('更新送货单状态失败')
      }

    })

    return '取消成功'
  }

  async getSecondDeliveryList({supplierId, deliveryBh, deliveryItemId}: DeliverySecondDto) {

    const item = await this.deliveryItemEntity
      .createQueryBuilder('item')
      .leftJoinAndMapMany(
        'item.deliverySecondDetail',
        DeliverySecondDetailEntity,
        'second',
        'second.deliveryItemId = item.deliveryItemId'
      )
      .where({deliveryBh, deliveryItemId, supplierId})
      .getOne()

    if (!item) {
      throw new Error('未找到该送货单明细')
    }

    if (item.deliverySecondDetail.length === 0) {
      throw new Error('没有二级明细')
    }

    return item.deliverySecondDetail || []
  }

  async getDeliveryItemDetail({supplierId, deliveryBh}: DeliveryDetailDto) {
    const item = await this.secondDetailEntity
      .createQueryBuilder()
      .where({deliveryBh})
      .getMany()

    if (!item || item.length === 0) {
      throw new Error('没有二级明细')
    }

    return item || []
  }

  async getDeliveryStatusRecordList({supplierId, deliveryBh}: DeliveryDetailDto) {

    const delivery =
      await this.deliveryEntity.findOne({where: {supplierId: supplierId.toString(), deliveryBh}})

    if (!delivery) {
      throw new Error('未找到该送货单')
    }

    return await this.deliveryStatusRecordEntity.find({where: {deliveryBh}})
  }

}
