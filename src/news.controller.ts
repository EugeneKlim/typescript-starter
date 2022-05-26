import { NewsItems } from './interfaces/newsItems.interface';
import { NewsDto } from './dto/news.dto';
import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Res, HttpException, BadRequestException } from '@nestjs/common'
import { NewsService } from './news.service'


@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Post()
  create(@Body() newsDto: NewsDto): Promise<NewsItems> {
    return this.newsService.create(newsDto)
  }

  @Get()
  getAllNews(): Promise<NewsItems[]> {
    return this.newsService.findAll()
  }

  @Get(':id')
  async getNewsById(@Param('id') id: string): Promise<NewsItems | null> {
    return this.newsService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() newsDto: NewsDto
  ): Promise<NewsItems | null> {
    return this.newsService.update(id, newsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void | null> {
    return this.newsService.remove(id);
  }

}