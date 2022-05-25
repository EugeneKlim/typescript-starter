import { NewsItems } from './interfaces/newsItems.interface';
import { NewsDto } from './dto/news.dto';
import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common'
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
  @HttpCode(HttpStatus.NOT_FOUND)
  getNewsById(@Param('id') id: string): Promise<NewsItems | null> {
    return this.newsService.findById(id)
  }

  @Put(':id')
  @HttpCode(HttpStatus.NOT_FOUND)
  update(
    @Param('id') id: string,
    @Body() newsDto: NewsDto
  ): Promise<NewsItems | null> {
    return this.newsService.update(id, newsDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NOT_FOUND)
  remove(@Param('id') id: string): Promise<void | null> {
    return this.newsService.remove(id)
  }
}