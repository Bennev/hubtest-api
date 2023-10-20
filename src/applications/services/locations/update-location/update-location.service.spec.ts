import { Location } from '../../../../domain/locations/location';
import { LocationInMemoryRepository } from '../../../../infra/database/in-memory/location-in-memory.repository';
import { UpdateLocationService } from './update-location.service';
import { Company } from '../../../../domain/companies/company';
import { DefaultError } from '../../../errors/default-error';
import { errorMessages } from '../../../errors/error-messages';
import { User } from '../../../../domain/users/user';

describe('Update Location Service', () => {
  let location: Location;
  const locationRepository = new LocationInMemoryRepository();
  const updateLocationService = new UpdateLocationService(locationRepository);
  const user = new User({
    name: 'test-name',
    email: 'test@email.com',
    password: 'test-password',
  });
  const company = new Company({
    name: ' Test       123 ',
    website: 'test.com',
    cnpj: '11.222.333/0001-44',
    user,
  });

  beforeAll(async () => {
    location = await locationRepository.create(
      new Location({
        name: 'location',
        cep: '60.000-000',
        street: 'street',
        number: '1',
        neighborhood: 'neighborhood',
        city: 'city',
        state: 'state',
        company,
      }),
    );
  });

  it('should be able to update a location', async () => {
    const updatedLocation = await updateLocationService.execute(
      {
        city: 'test-city',
      },
      location.id,
    );

    expect(updatedLocation).toBeDefined();
    expect(updatedLocation.city).toBe('test-city');
  });

  it('should not be able to update a location with invalid cep', async () => {
    expect(async () => {
      await updateLocationService.execute(
        {
          cep: 'abcdef',
        },
        location.id,
      );
    }).rejects.toThrow(
      new DefaultError(errorMessages.location.cepInvalid, 400),
    );
  });
});
