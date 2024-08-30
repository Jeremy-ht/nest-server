import { Controller } from '@nestjs/common';
import { SptService } from './spt.service';

@Controller('spt')
export class SptController {
  constructor(private readonly sptService: SptService) {}

}
