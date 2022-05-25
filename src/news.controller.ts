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
  async getNewsById(@Res() res, @Param('id') id: string) {
    const news: NewsItems = await this.newsService.findById(id);
    if (news === undefined) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `news with id: ${id}, not found`,
      }, HttpStatus.NOT_FOUND);
    }
    else {
      res.status(HttpStatus.OK).json(news).send();
    }
  }

  @Put(':id')
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() newsDto: NewsDto
  ) {
    const news: NewsItems = await this.newsService.update(id, newsDto);
    if (news === undefined) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `news with id: ${id}, not found`,
      }, HttpStatus.NOT_FOUND);
    }
    else {
      res.status(HttpStatus.OK).json(news).send();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void | null> {
    return this.newsService.remove(id)
  }
}