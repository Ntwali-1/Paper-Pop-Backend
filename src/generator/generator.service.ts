import { Injectable, BadRequestException } from '@nestjs/common';
import { TemplatesService } from '../templates/template.service';
import * as puppeteer from 'puppeteer';

@Injectable()
export class GeneratorService {
  constructor(private readonly templatesService: TemplatesService) {}

  private replaceTemplateVariables(html: string, data: Record<string, any>): string {
    let result = html;
    for (const [key, value] of Object.entries(data)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, value || '');
    }
    return result;
  }

  async generatePDF(templateId: string, requiredFields: string[], data: Record<string, any>): Promise<Buffer> {
    // Get template from database
    const template = await this.templatesService.findOne(templateId);

    // Check required fields
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      throw new BadRequestException(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Replace variables in HTML
    const htmlContent = this.replaceTemplateVariables(template.htmlContent, data);

    // Generate PDF using Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
    });

    await browser.close();

    return Buffer.from(pdfBuffer);
  }

  async generateImage(templateId: string, requiredFields: string[], data: Record<string, any>): Promise<Buffer> {
    const template = await this.templatesService.findOne(templateId);

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      throw new BadRequestException(`Missing required fields: ${missingFields.join(', ')}`);
    }

    const htmlContent = this.replaceTemplateVariables(template.htmlContent, data);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600 });
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: true,
    });

    await browser.close();

    return Buffer.from(screenshot);
  }
}