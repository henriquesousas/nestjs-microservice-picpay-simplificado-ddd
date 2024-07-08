import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        database:
          process.env.NODE_ENV === 'test'
            ? configService.getOrThrow('DB_NAME_TEST')
            : configService.getOrThrow('DB_NAME'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('DB_SYNCHRONIZE'),
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {
  static forFeature(models: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(models);
  }
}
