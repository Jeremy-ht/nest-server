import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import {
  DeliveryDetailDto,
  DeliveryQueryDto,
  DeliverySecondDto
} from '~/modules/supplier/delivery/dto/get-delivery.dto';

@ApiTags('供应链 - 送货单模块')
@ApiSecurityAuth()
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {
  }
  
  @ApiOperation({ summary: '送货单列表' })
  @Get('getDeliveryListByPage')
  getDeliveryListByPage(@Query() deliveryQueryDto: DeliveryQueryDto) {
    return this.deliveryService.getDeliveryListByPage(deliveryQueryDto);
  }
  
  @ApiOperation({ summary: '送货单详情' })
  @Get('detail')
  findOne(@Query() detailDto: DeliveryDetailDto) {
    return this.deliveryService.findOneByDeliveryBh(detailDto);
  }
  
  @ApiOperation({ summary: '送货单流转状态列表' })
  @Get('getDeliveryStatusRecordList')
  getDeliveryStatusRecordList(@Query() detailDto: DeliveryDetailDto) {
    return this.deliveryService.getDeliveryStatusRecordList(detailDto);
  }
  
  @ApiOperation({ summary: '根据送货单号获取二级明细' })
  @Get('getDeliveryItemDetail')
  getDeliveryItemDetail(@Query() detailDto: DeliveryDetailDto) {
    return this.deliveryService.getDeliveryItemDetail(detailDto);
  }
  
  @ApiOperation({ summary: '获取产品二级明细' })
  @Get('getSecondDeliveryList')
  getSecondDeliveryList(@Query() secondDto: DeliverySecondDto) {
    return this.deliveryService.getSecondDeliveryList(secondDto);
  }
  
  @ApiOperation({ summary: '撤销送货单' })
  @Post('cancelDelivery')
  cancelDelivery(@Body() detailDto: DeliveryDetailDto) {
    return this.deliveryService.cancelDelivery(detailDto);
  }
  

  
  
}
