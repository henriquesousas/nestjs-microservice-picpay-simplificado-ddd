import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NotFoundErrorFilter } from './filter/not-found-error.filter';
import { EntityValidationErrorFilter } from './filter/entity-validation-error.filter';
import { TransactionNotAllowedErrorFilter } from './filter/transaction-not-allowed-error.filter';

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
    new NotFoundErrorFilter(),
    new EntityValidationErrorFilter(),
    new TransactionNotAllowedErrorFilter(),
  );
}
