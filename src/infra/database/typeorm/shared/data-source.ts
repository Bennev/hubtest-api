import 'dotenv/config';
import { resolve } from 'path';
import { DataSource } from 'typeorm';

const migrationsDir = resolve(__dirname, '..', 'migrations', '*{.ts,.js}');

const entitiesDir = resolve(__dirname, '..', 'entities', '*.entity{.ts,.js}');

export const dataSource = new DataSource({
  type: 'postgres',
  port: parseInt(process.env.DB_PORT),
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrationsRun: true,
  entities: [entitiesDir],
  migrations: [migrationsDir],
  synchronize: false,
  uuidExtension: 'uuid-ossp',
});
