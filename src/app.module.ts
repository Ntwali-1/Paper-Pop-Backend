import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplatesModule } from './templates/template.module';
import { GeneratorModule } from './generator/generator.module';

@Module({
  imports: [TemplatesModule, GeneratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
