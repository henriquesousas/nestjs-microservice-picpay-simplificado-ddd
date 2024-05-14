import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { HttpExceptionFilter } from 'src/@shared/filter/HttpExceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const port = configService.get('HTTP_PORT');
  await app.listen(port, () => {
    console.log(`App running at port ${port}`);
  });
}
bootstrap();
