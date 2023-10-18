import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { DatabaseModule } from '../database/database.module';
import { JwtAuthGuard } from '../../strategies/jwt-auth.guard';
import { CreateLocationService } from 'src/applications/services/locations/create-location/create-location.service';
import { LocationRepositoryInterface } from 'src/domain/locations/location.repository';
import { CompanyRepositoryInterface } from 'src/domain/companies/company.repository';
import { FindAllLocationsService } from 'src/applications/services/locations/find-all-locations/find-all-locations.service';
import { FindOneLocationService } from 'src/applications/services/locations/find-one-location/find-one-locations.service';
import { UpdateLocationService } from 'src/applications/services/locations/update-location/update-location.service';
import { RemoveLocationService } from 'src/applications/services/locations/remove-location/remove-location.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LocationsController],
  providers: [
    JwtAuthGuard,
    {
      provide: CreateLocationService,
      useFactory: (
        locationRepository: LocationRepositoryInterface,
        companyRepository: CompanyRepositoryInterface,
      ) => {
        return new CreateLocationService(locationRepository, companyRepository);
      },
      inject: [CompanyRepositoryInterface, CompanyRepositoryInterface],
    },
    {
      provide: FindAllLocationsService,
      useFactory: (locationRepository: LocationRepositoryInterface) => {
        return new FindAllLocationsService(locationRepository);
      },
      inject: [LocationRepositoryInterface],
    },
    {
      provide: FindOneLocationService,
      useFactory: (locationRepository: LocationRepositoryInterface) => {
        return new FindOneLocationService(locationRepository);
      },
      inject: [LocationRepositoryInterface],
    },
    {
      provide: UpdateLocationService,
      useFactory: (companiesRepository: LocationRepositoryInterface) => {
        return new UpdateLocationService(companiesRepository);
      },
      inject: [LocationRepositoryInterface],
    },
    {
      provide: RemoveLocationService,
      useFactory: (companiesRepository: LocationRepositoryInterface) => {
        return new RemoveLocationService(companiesRepository);
      },
      inject: [LocationRepositoryInterface],
    },
  ],
})
export class LocationsModule {}
