import { NestFactory } from '@nestjs/core';
import { AppModule } from './app-module';
import { ConfigService } from '@nestjs/config';
import { applyGlobalConfig } from '../libs/common/src/nestjs/global-config';

// app.connectMicroservice(RabbitMQClient.getOptions('queue1'));
//await app.startAllMicroservices();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  applyGlobalConfig(app);

  const port = configService.get('HTTP_PORT');
  await app.listen(port, '0.0.0.0', () => {
    console.log(`App running at port ${port}`);
  });
}
bootstrap();
