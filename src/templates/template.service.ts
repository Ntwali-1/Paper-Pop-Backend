import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTemplateDto, UpdateTemplateDto, TemplateCategory } from './dto/template.dto';
import { Template } from '@prisma/client';

@Injectable()
export class TemplatesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
        return await this.prisma.template.create({
            data: createTemplateDto,
        });
    }

    async findAll(): Promise<Template[]> {
        return await this.prisma.template.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByCategory(category: TemplateCategory): Promise<Template[]> {
        const templates = await this.prisma.template.findMany({
            where: {
                category,
                isActive: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        if (templates.length === 0) {
            throw new NotFoundException(`No templates found for category: ${category}`);
        }

        return templates;
    }

    async findOne(id: string): Promise<Template> {
        const template = await this.prisma.template.findUnique({
            where: { id },
        });

        if (!template || !template.isActive) {
            throw new NotFoundException(`Template with ID ${id} not found`);
        }

        return template;
    }

    async update(id: string, updateTemplateDto: UpdateTemplateDto): Promise<Template> {
        await this.findOne(id);

        return await this.prisma.template.update({
            where: { id },
            data: updateTemplateDto,
        });
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);

        await this.prisma.template.update({
            where: { id },
            data: { isActive: false },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.template.delete({
            where: { id },
        });
    }

    async search(query: string): Promise<Template[]> {
        const searchQuery = query.toLowerCase().trim();
        
        const matchingCategories = Object.values(TemplateCategory).filter(category => 
            category.toLowerCase().includes(searchQuery)
        );

        const searchConditions: any[] = [
            { name: { contains: query, mode: 'insensitive' as const } },
            { description: { contains: query, mode: 'insensitive' as const } },
        ];

        if (matchingCategories.length > 0) {
            searchConditions.push(
                ...matchingCategories.map(category => ({ category }))
            );
        }

        return await this.prisma.template.findMany({
            where: {
                isActive: true,
                OR: searchConditions,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    getCategories(): TemplateCategory[] {
        return Object.values(TemplateCategory);
    }

    async getStats() {
        const total = await this.prisma.template.count({
            where: { isActive: true },
        });

        const byCategory: Record<TemplateCategory, number> = {
            invitations: 0,
            communiques: 0,
            requests: 0,
        };

        for (const category of Object.values(TemplateCategory)) {
            byCategory[category] = await this.prisma.template.count({
                where: {
                    category,
                    isActive: true,
                },
            });
        }

        return { total, byCategory };
    }
}