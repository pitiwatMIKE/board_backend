// typeorm.config.ts
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import * as entities from './src/entities';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: Object.values(entities),
  migrations: ['./src/migrations/*.ts'],
  migrationsTableName: 'migrations_typeorm',
  synchronize: false,
  extra: {
    socketPath: configService.get<string>('DATABASE_SOCKET_PATH'),
  }
});