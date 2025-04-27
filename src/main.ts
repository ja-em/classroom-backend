import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ErrorExceptionFilter } from 'filters/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorExceptionFilter());

  await app.listen(3000);
}
bootstrap()
  .then(() => {
    Logger.log(
      'Server is running on http://localhost:3000/graphql',
      'NestApplication',
    );
  })
  .catch((error) => {
    console.error('Error starting the server:', error);
  });
