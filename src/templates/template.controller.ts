import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    HttpException,
    HttpStatus,
    ValidationPipe,
    UsePipes,
} from '@nestjs/common';
import { TemplatesService } from './template.service';
import { CreateTemplateDto, UpdateTemplateDto, TemplateCategory } from './dto/template.dto';

@Controller('api/templates')
export class TemplatesController {
    constructor(private readonly templatesService: TemplatesService) { }
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createTemplateDto: CreateTemplateDto) {
        return await this.templatesService.create(createTemplateDto);
    }

    @Get()
    async findAll(@Query('category') category?: TemplateCategory) {
        try {
            if (category) {
                if (!Object.values(TemplateCategory).includes(category)) {
                    throw new HttpException(
                        `Invalid category. Must be one of: ${Object.values(TemplateCategory).join(', ')}`,
                        HttpStatus.BAD_REQUEST,
                    );
                }
                return await this.templatesService.findByCategory(category);
            }
            return await this.templatesService.findAll();
        } catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('categories')
    getCategories() {
        return {
            categories: this.templatesService.getCategories(),
        };
    }

    @Get('stats')
    async getStats() {
        return await this.templatesService.getStats();
    }

    @Get('search')
    async search(@Query('q') query: string) {
        if (!query || query.trim() === '') {
            throw new HttpException('Search query is required', HttpStatus.BAD_REQUEST);
        }
        return await this.templatesService.search(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.templatesService.findOne(id);
    }

    /*@Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @Param('id') id: string,
        @Body() updateTemplateDto: UpdateTemplateDto,
    ) {
        return await this.templatesService.update(id, updateTemplateDto);
    }*/

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.templatesService.remove(id);
        return { message: 'Template deleted successfully' };
    }
}