import { LocationInMemoryRepository } from '../../../../infra/database/in-memory/location-in-memory.repository';
import { FindAllLocationsService } from './find-all-locations.service';
import { Company } from '../../../../domain/companies/company';
import { Location } from '../../../../domain/locations/location';

describe('Find All Locations by Company', () => {
  const locationRepository = new LocationInMemoryRepository();
  const findAllLocationsService = new FindAllLocationsService(
    locationRepository,
  );

  it('should be able to find all locations by company', async () => {
    const company = new Company({
      name: ' Test       123 ',
      website: 'test.com',
      cnpj: '11.222.333/0001-44',
      userId: 'userId',
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
        companyId: company.id,
      }),
    );

    await locationRepository.create(
      new Location({
        name: 'location',
        cep: '60.000-000',
        street: 'street',
        number: '1',
        neighborhood: 'neighborhood',
        city: 'city',
        state: 'state',
        companyId: 'fake-company-id',
      }),
    );

    const locations = await findAllLocationsService.execute(company.id);

    expect(locations).toBeDefined();
    expect(locations).toHaveLength(1);
  });
});
