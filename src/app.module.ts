import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersModule } from './infra/nestjs/modules/users/users.module';
import { typeOrmConfig } from './infra/nestjs/config/typeorm.config';
import { CompaniesModule } from './infra/nestjs/modules/companies/companies.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, CompaniesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
