import { Module } from '@nestjs/common';
import { HttpModule as HttpAxiosModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpAxiosModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
      }),
    }),
  ],
  exports: [HttpAxiosModule],
})
export class HttpModule {}
