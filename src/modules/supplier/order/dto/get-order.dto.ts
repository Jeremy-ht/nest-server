import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { PagerDto } from '~/common/dto/pager.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderFiled {
  createTime: string;
  amount: string;
}

export class GetOrderDto {

  @ApiProperty({description: '供应商id'})
  supplierId: number;

  @ApiProperty({description: '搜索'})
  search?: string;

  @ApiProperty({description: '状态'})
  orderStatus?: string;

  @ApiProperty({description: '最小金额'})
  startAmount?: string;

  @ApiProperty({description: '最大金额'})
  endAmount?: string;

  @ApiProperty({description: '开始时间'})
  startDate?: string;

  @ApiProperty({description: '结束时间'})
  endDate?: string;

  @ApiProperty({description: '院区编号'})
  areaCode?: string;

  @ApiProperty({description: '订单编号'})
  orderBh?: string;

  @ApiProperty({description: '排序字段'})
  order?: OrderFiled[];
}


export class OrderQueryDto extends IntersectionType(PagerDto<GetOrderDto>, PartialType(GetOrderDto)) {

}


export class OrderDetailDto {

  @ApiProperty({description: '供应商id'})
  @IsNotEmpty({message: '供应商id不能为空'})
  @IsNumber({}, {message: '供应商id必须为数字'})
  supplierId: number;

  @ApiProperty({description: '订单编号'})
  @IsNotEmpty({message: '订单编号不能为空'})
  orderBh: string;

}
