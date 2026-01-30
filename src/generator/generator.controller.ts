import { Controller, Post, Body, Res, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import type { Response } from 'express';
import { GeneratorService } from './generator.service';
import { GenerateDto } from '../templates/dto/template.dto';

@Controller('api/generate')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {} 


  //Generate
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async generate(@Body() generateDto: GenerateDto, @Res() res: Response) {
    try {
      let buffer: Buffer;
      let contentType: string;
      let filename: string;

      if (generateDto.format === 'pdf') {
        buffer = await this.generatorService.generatePDF(
          generateDto.templateId,
          generateDto.requiredFields,
          generateDto.data,
        );
        contentType = 'application/pdf';
        filename = `template-${generateDto.templateId}-${Date.now()}.pdf`;
      } else if (generateDto.format === 'image') {
        buffer = await this.generatorService.generateImage(
          generateDto.templateId,
          generateDto.requiredFields,
          generateDto.data,
        );
        contentType = 'image/png';
        filename = `template-${generateDto.templateId}-${Date.now()}.png`;
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid format. Must be "pdf" or "image"',
        });
      }

      res.set({
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': buffer.length,
      });

      return res.status(HttpStatus.OK).send(buffer);
    } catch (error) {
      return res.status(error.status || HttpStatus.BAD_REQUEST).json({
        statusCode: error.status || HttpStatus.BAD_REQUEST,
        message: error.message || 'Error generating document',
      });
    }
  }

  // Optional: Preview endpoint (returns base64 for frontend preview)
  @Post('preview')
  @UsePipes(new ValidationPipe({ transform: true }))
  async preview(@Body() generateDto: GenerateDto) {
    try {
      const buffer = await this.generatorService.generateImage(
        generateDto.templateId,
        generateDto.requiredFields,
        generateDto.data,
      );

      // Return base64 encoded image for preview
      const base64Image = buffer.toString('base64');
      return {
        success: true,
        preview: `data:image/png;base64,${base64Image}`,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}