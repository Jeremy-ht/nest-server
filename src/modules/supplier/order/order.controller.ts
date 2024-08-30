import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDetailDto, OrderQueryDto } from './dto/get-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { DeliveryDetailDto } from '~/modules/supplier/delivery/dto/get-delivery.dto';
import { OrderSendSubmit } from '~/modules/supplier/order/dto/order-submit.dto';

@ApiTags('供应链 - 订单模块')
@ApiSecurityAuth()
@Controller('supplier/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }
  
  @ApiOperation({ summary: '订单列表' })
  @Get('getOrderListByPage')
  getOrderListByPage(@Query() orderDto: OrderQueryDto) {
    return this.orderService.getOrderListByPage(orderDto);
  }
  
  @ApiOperation({ summary: '订单详情' })
  @Get('detail')
  findOne(@Query() orderDto: OrderDetailDto) {
    return this.orderService.findOneByOrderBh(orderDto);
  }
  
  @ApiOperation({ summary: '根据订单编号查询待发货订单明细' })
  @Get('getWaitSendOrderItemListByPage')
  getWaitSendOrderItemListByPage(@Query() orderDto: OrderDetailDto) {
    return this.orderService.getWaitSendOrderItemListByPage(orderDto);
  }
  
  @ApiOperation({ summary: '生成送货单' })
  @Post('orderSendSubmit')
  orderSendSubmit(@Body() orderSendSubmit: OrderSendSubmit) {
    return this.orderService.orderSendSubmit(orderSendSubmit);
  }
  
}
