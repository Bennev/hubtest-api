import { LocationInMemoryRepository } from '../../../../infra/database/in-memory/location-in-memory.repository';
import { RemoveLocationService } from './remove-location.service';
import { Company } from '../../../../domain/companies/company';
import { Location } from '../../../../domain/locations/location';
import { User } from '../../../../domain/users/user';

describe('Remove Location Service', () => {
  const locationRepository = new LocationInMemoryRepository();
  const removeLocationService = new RemoveLocationService(locationRepository);
  const user = new User({
    name: 'test-name',
    email: 'test@email.com',
    password: 'test-password',
  });

  it('should be able to remove a location', async () => {
    const company = new Company({
      name: ' Test       123 ',
      website: 'test.com',
      cnpj: '11.222.333/0001-44',
      user,
    });

    const location = await locationRepository.create(
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

    expect(locationRepository.items).toHaveLength(1);

    await removeLocationService.execute(location.id);

    const removedLocation = await locationRepository.findOne({
      where: { id: location.id },
    });

    expect(removedLocation).toBeUndefined();
    expect(locationRepository.items).toHaveLength(0);
  });
});
