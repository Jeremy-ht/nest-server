import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryEntity } from '~/modules/supplier/delivery/entities/delivery.entity';
import { OrderDeliveryRelationEntity } from '~/modules/supplier/order/entities/orderDeliveryRelation.entity';
import { OrderEntity } from '~/modules/supplier/order/entities/order.entity';
import { OrderItemEntity } from '~/modules/supplier/order/entities/orderItem.entity';
import { DeliverySecondDetailEntity } from '~/modules/supplier/delivery/entities/deliverySecondDetail.entity';
import { DeliveryItemEntity } from '~/modules/supplier/delivery/entities/deliveryItem.entity';
import { DeliveryStatusRecordEntity } from '~/modules/supplier/delivery/entities/deliveryStatusRecord.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DeliveryEntity,
      DeliveryItemEntity,
      DeliverySecondDetailEntity,
      OrderDeliveryRelationEntity,
      DeliveryStatusRecordEntity,
      OrderEntity,
      OrderItemEntity
    ])
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService],
  exports: [DeliveryService]
})
export class DeliveryModule {
}
