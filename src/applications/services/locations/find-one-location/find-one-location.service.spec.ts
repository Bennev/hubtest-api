import { Company } from '../../../../domain/companies/company';
import { LocationInMemoryRepository } from '../../../../infra/database/in-memory/location-in-memory.repository';
import { FindOneLocationService } from './find-one-locations.service';
import { Location } from '../../../../domain/locations/location';
import { DefaultError } from '../../../errors/default-error';
import { errorMessages } from '../../../errors/error-messages';

describe('Find One Location', () => {
  const locationRepository = new LocationInMemoryRepository();
  const findOneLocationService = new FindOneLocationService(locationRepository);

  it('should be able to find a location', async () => {
    const company = new Company({
      name: ' Test       123 ',
      website: 'test.com',
      cnpj: '11.222.333/0001-44',
      userId: 'userId',
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
        companyId: company.id,
      }),
    );

    const locationFound = await findOneLocationService.execute(location.id);

    expect(locationFound).toBeDefined();
    expect(locationFound).toHaveProperty('id');
    expect(locationFound).toHaveProperty('createdAt');
  });

  it('should not be able to find a location that does not exists', () => {
    expect(async () => {
      await findOneLocationService.execute('fake-locationId');
    }).rejects.toThrow(new DefaultError(errorMessages.location.notFound, 404));
  });
});
