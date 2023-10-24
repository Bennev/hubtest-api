import { LocationRepositoryInterface } from '../../../../domain/locations/location.repository';
import { UpdateLocationDtoInterface } from './update-location.dto';
import { DefaultError } from '../../../errors/default-error';
import { errorMessages } from '../../../errors/error-messages';
import { Location } from '../../../../domain/locations/location';

export class UpdateLocationService {
  constructor(private locationRepository: LocationRepositoryInterface) {}

  async execute(
    {
      name,
      cep,
      street,
      number,
      neighborhood,
      city,
      state,
    }: UpdateLocationDtoInterface,
    locationId: string,
  ): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: { id: locationId },
    });

    if (!location) throw new DefaultError(errorMessages.location.notFound, 404);

    if (name) {
      const formattedName = name.replace(/\s+/g, ' ').trim();
      location.name = formattedName;
    }

    if (cep) {
      const cepOnlyNumbers = cep.replace(/\D/g, '');
      const CEP_LENGTH = 8;

      if (!cepOnlyNumbers || cepOnlyNumbers.length !== CEP_LENGTH)
        throw new DefaultError(errorMessages.location.cepInvalid, 400);

      location.cep = cepOnlyNumbers;
    }

    if (street) location.street = street;
    if (number) location.number = number;
    if (neighborhood) location.neighborhood = neighborhood;
    if (city) location.city = city;
    if (state) location.state = state;

    await this.locationRepository.update(location);

    return location;
  }
}
