import { IsEnum, IsString, IsArray, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TemplateCategory } from '@prisma/client';

export { TemplateCategory };

export class CreateTemplateDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: TemplateCategory })
  @IsEnum(TemplateCategory)
  category: TemplateCategory;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  htmlContent: string;
}

export class UpdateTemplateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: TemplateCategory })
  @IsOptional()
  @IsEnum(TemplateCategory)
  category?: TemplateCategory;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  htmlContent?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class GenerateDto {
  @ApiProperty()
  @IsString()
  templateId: string;

  @ApiProperty({ enum: ['pdf', 'image'] })
  @IsEnum(['pdf', 'image'])
  format: 'pdf' | 'image';

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  requiredFields: string[];

  @ApiProperty({ type: Object })
  data: Record<string, any>;
}
