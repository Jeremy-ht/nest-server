import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '~/modules/supplier/order/entities/order.entity';
import { DeliveryService } from '~/modules/supplier/delivery/delivery.service';
import { DeliveryModule } from '~/modules/supplier/delivery/delivery.module';
import { OrderItemEntity } from '~/modules/supplier/order/entities/orderItem.entity';
import { DeliveryEntity } from '~/modules/supplier/delivery/entities/delivery.entity';
import { DeliveryItemEntity } from '~/modules/supplier/delivery/entities/deliveryItem.entity';
import { DeliverySecondDetailEntity } from '~/modules/supplier/delivery/entities/deliverySecondDetail.entity';
import { DeliveryPersonHistoryEntity } from '~/modules/supplier/delivery/entities/deliveryPersonHistory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      DeliveryEntity,
      DeliveryItemEntity,
      DeliverySecondDetailEntity,
      DeliveryPersonHistoryEntity
    ]),
    DeliveryModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {
}
