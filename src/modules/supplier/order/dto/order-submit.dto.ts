import { OrderItemEntity } from '~/modules/supplier/order/entities/orderItem.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OrderSendItemDto {
  item: OrderItemEntity;
  selectList: OrderSendDetailDto[];
}

export class OrderSendDetailDto {
  productId: number;
  stockId: number;
  supplierId: number;
  productCode: string;
  productStandardCode: string;
  productUnit: string;
  inPrice: number;
  salePrice: number;
  productName: string;
  productStandardName: string;
  specs: string;
  productModel: string;
  minUnit: string;
  factoryId: number;
  factoryName: string;
  brand: string;
  standardCode: string;
  registerCertificateName: string;
  registerCertificateEndtime: string;
  batchBh: string;
  udiDiBh: string;
  stockNum: number;
  realNum: number;
  validDate: string;
  supplierSimpleName: string;
  detailFlag: string;
  sn: string;
  catCode: string;
  catName: string;
  medicalInsuranceCode: string;
  medicalInsuranceSn: string;
  isImport: string;
  canUseNum: number;
  canRepeatUse: string;
  py: string;
  packageUnit: string;
  packageModel: number;
  supplierName: string;
  inStockDate: string;
  sendNum: number;
  mainBarCode: string;
  secondBarCode: string;
  paramArgs: string;
  addType: number;
  secondSnList: OrderSendSecondDto[];
}

export class OrderSendSecondDto {
  mainBarCode: string;
  secondBarCode: string;
}

export class ContactPerson {
  @ApiProperty({ description: '送货人姓名' })
  contactPersonName: string;
  
  @ApiProperty({ description: '送货人联系方式' })
  @IsNotEmpty({ message: '送货人联系方式不能为空' })
  contactInfo: string;
}

export class OrderSendSubmit {
  @ApiProperty({ description: '订单编号' })
  @IsNotEmpty({ message: '订单编号不能为空' })
  orderBh: string;
  
  @ApiProperty({ description: '订单明细列表' })
  resultList: OrderSendItemDto[];
  
  @ApiProperty({ description: '送货人' })
  contactPerson: ContactPerson;
  
  @ApiProperty({ description: '备注' })
  remark?: string;
  
  supplierId: number;
}
