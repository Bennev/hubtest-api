import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';

@Module({
  controllers: [CompaniesController],
  // providers: [CompaniesService],
})
export class CompaniesModule {}
