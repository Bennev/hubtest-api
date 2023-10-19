// import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersModule } from './infra/nestjs/modules/users/users.module';
// import { typeOrmConfig } from './infra/nestjs/config/typeorm.config';
import { CompaniesModule } from './infra/nestjs/modules/companies/companies.module';
import { LocationsModule } from './infra/nestjs/modules/locations/locations.module';
import { DatabaseModule } from './infra/nestjs/modules/database/database.module';
import { AuthModule } from './infra/nestjs/modules/auth/auth.module';
import { AdaptersModule } from './infra/nestjs/modules/adapters/adapters.module';

@Module({
  imports: [
    DatabaseModule,
    AdaptersModule,
    AuthModule,
    UsersModule,
    CompaniesModule,
    LocationsModule,
  ],
})
export class AppModule {}
