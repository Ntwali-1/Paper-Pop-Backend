import { Module } from '@nestjs/common';
import { TemplatesController } from './template.controller';
import { TemplatesService } from './template.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TemplatesController],
  providers: [TemplatesService, PrismaService],
  exports: [TemplatesService],
})
export class TemplatesModule {}