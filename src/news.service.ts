import { NewsDto } from './dto/news.dto';

import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { uuid } from 'uuidv4'
import { NewsItems } from './interfaces/newsItems.interface'



@Injectable()
export class NewsService {
  private newsList: NewsItems[] = [];

  async create(news: NewsItems): Promise<NewsItems> {
    this.newsList.push({
      id: uuid(),
      ...news,
      ownerId: uuid()
    })
    return this.newsList[-1]
  }

  async findAll(): Promise<NewsItems[]> {
    return this.newsList
  }

  async findById(id: string): Promise<NewsItems | null> {
    return this.newsList.find(n => n.id === id)
  }

  async update(id: string, NewsItems: NewsItems): Promise<NewsItems | null> {
    let newNews = this.newsList.find(n => n.id === id)
    if (newNews !== undefined) {
      newNews.title = NewsItems.title
      newNews.description = NewsItems.description
      return newNews
    }
  }

  async remove(id: string): Promise<void | null> {
    let desiredNews = this.newsList.find(n => n.id === id)
    if (desiredNews !== undefined) { this.newsList.splice(this.newsList.indexOf(desiredNews), 1) }
  }
}