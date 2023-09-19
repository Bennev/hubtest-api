import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersModule } from './infra/nestjs/modules/users/users.module';
import { typeOrmConfig } from './infra/nestjs/config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
