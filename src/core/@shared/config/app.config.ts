import { config as readEnv } from 'dotenv';
import { join } from 'path';

export class AppConfig {
  static env: any = null;

  static db() {
    AppConfig.readEnv();

    return {
      dialect: 'sqlite' as any,
      host: AppConfig.env.DB_HOST,
      logging: AppConfig.env.DB_LOGGING === 'true',
    };
  }

  static readEnv() {
    if (AppConfig.env) {
      return;
    }

    const { parsed } = readEnv({
      path: join(__dirname, `../../../../envs/.env.${process.env.NODE_ENV}`),
    });

    AppConfig.env = {
      ...parsed,
      ...process.env,
    };
  }
}
