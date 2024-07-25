import { Module } from '@nestjs/common';
import { HttpModule as HttpAxiosModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpAxiosModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  exports: [HttpAxiosModule],
})
export class HttpModule {}
