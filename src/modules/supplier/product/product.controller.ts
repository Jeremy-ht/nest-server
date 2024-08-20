import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDetailDto, ProductRegisterDto } from '~/modules/supplier/product/dto/get-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';

@ApiTags('供应链 - 产品模块')
@ApiSecurityAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @ApiOperation({summary: '根据产品ID获取产品信息'})
  @Get('getProductById')
  getProductById(@Query() productDetail: ProductDetailDto) {
    return this.productService.getProductById(productDetail);
  }

  @ApiOperation({summary: '获取产品注册证信息'})
  @Get('getProductRegister')
  getProductRegister(@Query() productRegisterDto: ProductRegisterDto) {
    return this.productService.getProductRegister(productRegisterDto);
  }

}
