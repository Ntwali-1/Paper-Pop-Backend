import { IsEnum, IsString, IsArray, IsOptional, IsBoolean } from 'class-validator';
import { TemplateCategory } from '@prisma/client';

export { TemplateCategory };

export class CreateTemplateDto {
    @IsString()
    name: string;

    @IsEnum(TemplateCategory)
    category: TemplateCategory;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    thumbnail?: string;

    @IsArray()
    @IsString({ each: true })
    requiredFields: string[];

    @IsString()
    htmlContent: string;
}

export class UpdateTemplateDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEnum(TemplateCategory)
    category?: TemplateCategory;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    requiredFields?: string[];

    @IsOptional()
    @IsString()
    htmlContent?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class GenerateDto {
    @IsString()
    templateId: string;

    @IsEnum(['pdf', 'image'])
    format: 'pdf' | 'image';

    data: Record<string, any>;
}