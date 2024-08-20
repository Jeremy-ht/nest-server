import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '~/modules/supplier/product/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDetailDto, ProductRegisterDto } from '~/modules/supplier/product/dto/get-product.dto';
import {
  ProductRegisterCertificateEntity
} from '~/modules/supplier/product/entities/productRegisterCertificate.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
    @InjectRepository(ProductRegisterCertificateEntity)
    private readonly certificateEntityRepository: Repository<ProductRegisterCertificateEntity>,
  ) {
  }

  async getProductById({productId, supplierId}: ProductDetailDto) {
    return await this.productEntity
      .createQueryBuilder()
      .where({productId, supplierId})
      .getOne()
  }

  async getProductRegister({productCode, orderItemId}: ProductRegisterDto) {
    return await this.certificateEntityRepository
      .createQueryBuilder()
      .where({
        orderItemId,
        productCode
      })
      .getMany()
  }
}
