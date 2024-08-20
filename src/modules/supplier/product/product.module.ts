import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '~/modules/supplier/product/entities/product.entity';
import {
  ProductRegisterCertificateEntity
} from '~/modules/supplier/product/entities/productRegisterCertificate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductRegisterCertificateEntity
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {
}
