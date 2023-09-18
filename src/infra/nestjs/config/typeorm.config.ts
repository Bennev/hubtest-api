import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserSchema } from '../../database/typeorm/user/user.schema';

require('dotenv').config();
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserSchema],
  synchronize: false,
  logging: false,
  migrations: ['../migrations/*{.ts,.js}'],
};
