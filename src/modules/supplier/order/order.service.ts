import { Injectable, Logger } from '@nestjs/common';
import { GetOrderDto, OrderDetailDto, OrderQueryDto } from './dto/get-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { OrderEntity } from '~/modules/supplier/order/entities/order.entity';
import { Pagination } from '~/helper/paginate/pagination';
import { paginate } from '~/helper/paginate';
import { DeliveryService } from '~/modules/supplier/delivery/delivery.service';

@Injectable()
export class OrderService {

  private logger = new Logger(OrderService.name)

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderEntity: Repository<OrderEntity>,
    private readonly deliveryService: DeliveryService
  ) {
  }

  async getOrderListByPage(
    {page, pageSize, supplierId, search, orderStatus, startAmount, endAmount, startDate, endDate, order}: OrderQueryDto
  ) {

    const queryBuilder = this.orderEntity
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItem', 'orderItem')
      .where({
        ...{supplierId},
        ...(search ? {orderBh: Like(`%${search}%`)} : {}),
        ...(orderStatus ? {orderStatus} : {}),
        ...(startAmount && endAmount ? {orderAmount: Between(startAmount, endAmount)} : {}),
        ...(startDate && endDate ? {orderTime: Between(startDate, endDate)} : {}),
      })
      .orderBy('order.orderTime', order || 'DESC')

    return paginate<OrderEntity>(queryBuilder, {page, pageSize})
  }


  async findOneByOrderBh({orderBh, supplierId}: OrderDetailDto) {

    const queryBuilder = await this.orderEntity
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItem', 'orderItem')
      .leftJoinAndSelect('order.orderDeliverys', 'orderDelivery')
      .where({orderBh, supplierId})
      .getOne()

    const resultMap = new Map<string, any>()
    resultMap.set('order', queryBuilder)
    const deliverys = queryBuilder.orderDeliverys

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

}
