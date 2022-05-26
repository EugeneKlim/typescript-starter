import { NewsItems } from './interfaces/newsItems.interface';
import { NewsDto } from './dto/news.dto';
import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Res, HttpException, BadRequestException } from '@nestjs/common'
import { NewsService } from './news.service'
import { NotFoundExceptionForService } from './notFonud.exception';


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
    const news: NewsItems = await this.newsService.findById(id)
    if (news === undefined) {
      throw new NotFoundExceptionForService(id)
    } else {
      return news;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() newsDto: NewsDto
  ): Promise<NewsItems | null> {
    const news: NewsItems = await this.newsService.update(id, newsDto)
    if (news === undefined) {
      throw new NotFoundExceptionForService(id)
    } else {
      return news;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void | null> {
    // const news: NewsItems = await this.newsService.remove(id);
    if (this.newsService.remove(id) === undefined) {
      throw new NotFoundExceptionForService(id)
    } else {
      return this.newsService.remove(id);
    }
  }

}