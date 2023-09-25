import { Module } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../../domain/users/user.repository';
import { UserTypeOrm } from '../../../database/typeorm/entities/user.entity';
import { dataSource } from '../../../database/typeorm/shared/data-source';

@Module({
  providers: [
    TypeOrmService,
    {
      provide: UserRepositoryInterface,
      useFactory: () => {
        return new UserTypeOrm(dataSource.getRepository(UserTypeOrm));
      },
      inject: [TypeOrmService],
    },
    // {
    //   provide: CompaniesRepository,
    //   useFactory: () => {
    //     return new CompaniesRepositoryTypeORM(
    //       dataSource.getRepository(CompanyTypeORMEntity),
    //     );
    //   },
    //   inject: [TypeOrmService],
    // },
    // {
    //   provide: PlacesRepository,
    //   useFactory: () => {
    //     return new PlacesRepositoryTypeORM(
    //       dataSource.getRepository(PlaceTypeORMEntity),
    //     );
    //   },
    //   inject: [TypeOrmService],
    // },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
