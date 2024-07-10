import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NotFoundErrorFilter } from './filter/not-found-error.filter';

export function applyGlobalConfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // app
  //   .useGlobalInterceptors
  //   // new WrapperDataInterceptor(),
  //   // new ClassSerializerInterceptor(app.get(Reflector)),
  //   ();

  app.useGlobalFilters(
    // new EntityValidationErrorFilter(),
    // new NotFoundErrorFilter(),
    new NotFoundErrorFilter(),
  );
}
