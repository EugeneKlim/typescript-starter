import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NewsModule } from './news.module';

async function bootstrap() {
  const app = await NestFactory.create(NewsModule);

  app.setGlobalPrefix("api/rest");
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8080);
}
bootstrap();
