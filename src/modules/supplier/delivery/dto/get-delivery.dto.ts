import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { PagerDto } from '~/common/dto/pager.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';


export class GetDeliveryDto {

  @ApiProperty({description: '供应商id'})
  supplierId: number;

  @ApiProperty({description: '搜索'})
  search?: string;

  @ApiProperty({description: '状态'})
  deliveryStatus?: string;

  @ApiProperty({description: '最小金额'})
  startAmount?: string;

  @ApiProperty({description: '最大金额'})
  endAmount?: string;

  @ApiProperty({description: '开始时间'})
  startTime?: string;

  @ApiProperty({description: '结束时间'})
  endTime?: string;

  @ApiProperty({description: '院区编号'})
  areaCode?: string;

  @ApiProperty({description: '送货单编号'})
  deliveryBh?: string;

}


export class DeliveryQueryDto extends IntersectionType(PagerDto<GetDeliveryDto>, PartialType(GetDeliveryDto)) {

}


export class DeliveryDetailDto {

  @ApiProperty({description: '供应商id'})
  @IsNotEmpty({message: '供应商id不能为空'})
  supplierId: number;

  @ApiProperty({description: '送货单编号'})
  @IsNotEmpty({message: '送货单编号不能为空'})
  deliveryBh: string;

}


export class DeliverySecondDto extends DeliveryDetailDto {

  @ApiProperty({description: '对应的一级明细id'})
  @IsNotEmpty({message: '一级明细id不能为空'})
  deliveryItemId: number;

}
