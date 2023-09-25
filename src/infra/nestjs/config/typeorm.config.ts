import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserTypeOrm } from '../../database/typeorm/entities/user.entity';
import { CompanyTypeOrm } from '../../database/typeorm/entities/company.entity';

require('dotenv').config();
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserTypeOrm, CompanyTypeOrm],
  synchronize: false,
  logging: false,
  migrations: ['../migrations/*{.ts,.js}'],
  autoLoadEntities: true,
};
