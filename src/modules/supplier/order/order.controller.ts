import { Controller, Get, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDetailDto, OrderQueryDto } from './dto/get-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';

@ApiTags('供应链 - 订单模块')
@ApiSecurityAuth()
@Controller('supplier/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @ApiOperation({summary: '订单列表'})
  @Get('getOrderListByPage')
  getOrderListByPage(@Query() orderDto: OrderQueryDto) {
    return this.orderService.getOrderListByPage(orderDto);
  }

  @ApiOperation({summary: '订单详情'})
  @Get('detail')
  findOne(@Query() orderDto: OrderDetailDto) {
    return this.orderService.findOneByOrderBh(orderDto);
  }

}
