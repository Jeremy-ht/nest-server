import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '~/modules/supplier/order/entities/order.entity';
import { DeliveryService } from '~/modules/supplier/delivery/delivery.service';
import { DeliveryModule } from '~/modules/supplier/delivery/delivery.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    DeliveryModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {
}
