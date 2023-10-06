import { Location } from 'src/domain/locations/location';
import { LocationRepositoryInterface } from '../../../../domain/locations/location.repository';

export class FindAllLocationsService {
  constructor(private locationRepository: LocationRepositoryInterface) {}

  async execute(companyId: string): Promise<Location[]> {
    const locations = await this.locationRepository.findAll({
      where: { companyId },
    });

    return locations;
  }
}
