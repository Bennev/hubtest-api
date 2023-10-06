import { Location } from '../../../../domain/locations/location';
import { LocationRepositoryInterface } from '../../../../domain/locations/location.repository';
import { DefaultError } from '../../../errors/default-error';
import { errorMessages } from '../../../errors/error-messages';

export class FindOneLocationService {
  constructor(private locationRepository: LocationRepositoryInterface) {}

  async execute(locationId: string): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: { id: locationId },
    });

    if (!location) throw new DefaultError(errorMessages.location.notFound, 404);

    return location;
  }
}
