
import { Injectable } from '@nestjs/common'
import { uuid } from 'uuidv4'
import { NewsItems } from './interfaces/newsItems.interface'


@Injectable()
export class NewsService {
  private newsList: NewsItems[] = [];

  foundNews = (id: string) => {
    let news = this.newsList.find(n => n.id === id);
    return news
  };

  async create(news: NewsItems): Promise<NewsItems> {
    this.newsList.push({
      id: uuid(),
      ...news,
      ownerId: uuid()
    })
    return this.newsList[this.newsList.length - 1]
  }

  async findAll(): Promise<NewsItems[]> {
    return this.newsList
  }

  async findById(id: string): Promise<NewsItems | null> {
    let news = this.foundNews(id)
    return news

  }

  async update(id: string, NewsItems: NewsItems): Promise<NewsItems | null> {
    let newNews = this.foundNews(id)
    newNews.title = NewsItems.title
    newNews.description = NewsItems.description
    return newNews
  }

  async remove(id: string): Promise<void | null> {
    let desiredNews = this.foundNews(id)
    this.newsList.splice(this.newsList.indexOf(desiredNews), 1)
  }
}