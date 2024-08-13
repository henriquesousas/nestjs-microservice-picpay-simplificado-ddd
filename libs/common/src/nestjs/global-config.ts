import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NotFoundExceptionFilter } from './filter/not-found-exception.filter';
import { EntityValidationExceptionFilter } from './filter/entity-validation-exception.filter';
import { TransactionNotAllowedExceptionFilter } from './filter/transaction-not-allowed-exception.filter';
import { HttpExceptionFilter } from './filter/http-exception.filter';

export function applyGlobalConfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
      whitelist: true,

      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  // app
  //   .useGlobalInterceptors
  // new WrapperDataInterceptor(),
  //   // new ClassSerializerInterceptor(app.get(Reflector)),
  //   ();

  app.useGlobalFilters(
    new NotFoundExceptionFilter(),
    new EntityValidationExceptionFilter(),
    // new TransactionNotAllowedErrorFilter(),
  );
}
