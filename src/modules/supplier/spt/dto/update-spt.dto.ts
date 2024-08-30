import { PartialType } from '@nestjs/mapped-types';
import { CreateSptDto } from './create-spt.dto';

export class UpdateSptDto extends PartialType(CreateSptDto) {}
