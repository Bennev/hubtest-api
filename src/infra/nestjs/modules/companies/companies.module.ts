import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { DatabaseModule } from '../database/database.module';
import { JwtAuthGuard } from '../../strategies/jwt-auth.guard';
import { CreateCompanyService } from 'src/applications/services/companies/create-company/create-company.service';
import { CompanyRepositoryInterface } from 'src/domain/companies/company.repository';
import { UserRepositoryInterface } from 'src/domain/users/user.repository';
import { FindAllCompaniesService } from 'src/applications/services/companies/find-all-companies/find-all-companies.service';
import { FindOneCompanyService } from 'src/applications/services/companies/find-one-company/find-one-company.service';
import { UpdateCompanyService } from 'src/applications/services/companies/update-company/update-company.service';
import { RemoveCompanyService } from 'src/applications/services/companies/remove-company/remove-company.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CompaniesController],
  providers: [
    JwtAuthGuard,
    {
      provide: CreateCompanyService,
      useFactory: (
        companyRepository: CompanyRepositoryInterface,
        userRepository: UserRepositoryInterface,
      ) => {
        return new CreateCompanyService(companyRepository, userRepository);
      },
      inject: [CompanyRepositoryInterface, UserRepositoryInterface],
    },
    {
      provide: FindAllCompaniesService,
      useFactory: (companyRepository: CompanyRepositoryInterface) => {
        return new FindAllCompaniesService(companyRepository);
      },
      inject: [CompanyRepositoryInterface],
    },
    {
      provide: FindOneCompanyService,
      useFactory: (companyRepository: CompanyRepositoryInterface) => {
        return new FindOneCompanyService(companyRepository);
      },
      inject: [CompanyRepositoryInterface],
    },
    {
      provide: UpdateCompanyService,
      useFactory: (companiesRepository: CompanyRepositoryInterface) => {
        return new UpdateCompanyService(companiesRepository);
      },
      inject: [CompanyRepositoryInterface],
    },
    {
      provide: RemoveCompanyService,
      useFactory: (companiesRepository: CompanyRepositoryInterface) => {
        return new RemoveCompanyService(companiesRepository);
      },
      inject: [CompanyRepositoryInterface],
    },
  ],
})
export class CompaniesModule {}
