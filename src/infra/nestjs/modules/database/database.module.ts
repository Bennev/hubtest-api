import { Module } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../../domain/users/user.repository';
import { UserTypeOrm } from '../../../database/typeorm/entities/user.entity';
import { dataSource } from '../../../database/typeorm/shared/data-source';
import { UserTypeOrmRepository } from '../../../database/typeorm/repositories/users/user-typeorm.repository';
import { CompanyRepositoryInterface } from '../../../../domain/companies/company.repository';
import { CompanyTypeOrmRepository } from '../../../database/typeorm/repositories/companies/company-typeorm.repository';
import { CompanyTypeOrm } from '../../../database/typeorm/entities/company.entity';
import { LocationRepositoryInterface } from '../../../../domain/locations/location.repository';
import { LocationTypeOrm } from '../../../database/typeorm/entities/location.entity';
import { LocationTypeOrmRepository } from '../../../database/typeorm/repositories/locations/location-typeorm.repository';
import { TypeOrmService } from '../../../database/typeorm/typeorm.service';

@Module({
  providers: [
    TypeOrmService,
    {
      provide: UserRepositoryInterface,
      useFactory: () => {
        return new UserTypeOrmRepository(dataSource.getRepository(UserTypeOrm));
      },
      inject: [TypeOrmService],
    },
    {
      provide: CompanyRepositoryInterface,
      useFactory: () => {
        return new CompanyTypeOrmRepository(
          dataSource.getRepository(CompanyTypeOrm),
        );
      },
      inject: [TypeOrmService],
    },
    {
      provide: LocationRepositoryInterface,
      useFactory: () => {
        return new LocationTypeOrmRepository(
          dataSource.getRepository(LocationTypeOrm),
        );
      },
      inject: [TypeOrmService],
    },
  ],
  exports: [
    UserRepositoryInterface,
    CompanyRepositoryInterface,
    LocationRepositoryInterface,
  ],
})
export class DatabaseModule {}
