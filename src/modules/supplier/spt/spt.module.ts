import { Module } from '@nestjs/common';
import { SptService } from './spt.service';
import { SptController } from './spt.controller';

@Module({
  controllers: [SptController],
  providers: [SptService],
})
export class SptModule {}
