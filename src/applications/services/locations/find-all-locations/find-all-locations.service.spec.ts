import { LocationInMemoryRepository } from '../../../../infra/database/in-memory/location-in-memory.repository';
import { FindAllLocationsService } from './find-all-locations.service';
import { Company } from '../../../../domain/companies/company';
import { Location } from '../../../../domain/locations/location';
import { User } from '../../../../domain/users/user';

describe('Find All Locations by Company', () => {
  const locationRepository = new LocationInMemoryRepository();
  const findAllLocationsService = new FindAllLocationsService(
    locationRepository,
  );
  const user = new User({
    name: 'test-name',
    email: 'test@email.com',
    password: 'test-password',
  });

  it('should be able to find all locations by company', async () => {
    const company = new Company({
      name: ' Test       123 ',
      website: 'test.com',
      cnpj: '11.222.333/0001-44',
      user,
    });

    await locationRepository.create(
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

    const fakeCompany = new Company({
      name: ' Test       123 ',
      website: 'test.com',
      cnpj: '44.333.222/0001-11',
      user,
    });

    await locationRepository.create(
      new Location({
        name: 'location',
        cep: '60.000-000',
        street: 'street',
        number: '1',
        neighborhood: 'neighborhood',
        city: 'city',
        state: 'state',
        company: fakeCompany,
      }),
    );

    const locations = await findAllLocationsService.execute({
      where: { company },
    });

    expect(locations).toBeDefined();
    expect(locations).toHaveLength(1);
  });
});
