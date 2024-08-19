import { PartialType } from '@nestjs/mapped-types';
import { GetOrderDto } from './get-order.dto';

export class UpdateOrderDto extends PartialType(GetOrderDto) {}
