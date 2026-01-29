import { Module } from '@nestjs/common';
import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';
import { TemplatesModule } from '../templates/template.module';

@Module({
  imports: [TemplatesModule],
  controllers: [GeneratorController],
  providers: [GeneratorService],
  exports: [GeneratorService], 
})
export class GeneratorModule {}