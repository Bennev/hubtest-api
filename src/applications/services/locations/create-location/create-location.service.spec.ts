import { DefaultError } from '../../../errors/default-error';
import { Company } from '../../../../domain/companies/company';
import { CompanyInMemoryRepository } from '../../../../infra/database/in-memory/company-in-memory.repository';
import { LocationInMemoryRepository } from '../../../../infra/database/in-memory/location-in-memory.repository';
import { CreateLocationService } from './create-location.service';
import { errorMessages } from '../../../errors/error-messages';
import { User } from '../../../../domain/users/user';

describe('Create Location Service', () => {
  const companyRepository = new CompanyInMemoryRepository();
  const locationRepository = new LocationInMemoryRepository();
  const createLocationService = new CreateLocationService(
    locationRepository,
    companyRepository,
  );
  const user = new User({
    name: 'test-name',
    email: 'test@email.com',
    password: 'test-password',
  });
  let company: Company;

  beforeAll(async () => {
    company = await companyRepository.create(
      new Company({
        name: ' Test       123 ',
        website: 'test.com',
        cnpj: '11.222.333/0001-44',
        user,
      }),
    );
  });

  it('should be able to create a new location', async () => {
    const location = await createLocationService.execute({
      name: 'location',
      cep: '60.000-000',
      street: 'street',
      number: '1',
      neighborhood: 'neighborhood',
      city: 'city',
      state: 'state',
      companyId: company.id,
    });

    expect(location).toBeDefined();
    expect(location).toHaveProperty('id');
    expect(location).toHaveProperty('createdAt');
    expect(location.cep).toBe('60000000');
    expect(locationRepository.items).toHaveLength(1);
  });

  it('should not be able to create a new location with invalid cep', async () => {
    expect(async () => {
      await createLocationService.execute({
        name: 'location',
        cep: 'abcdef',
        street: 'street',
        number: '1',
        neighborhood: 'neighborhood',
        city: 'city',
        state: 'state',
        companyId: company.id,
      });
    }).rejects.toThrow(
      new DefaultError(errorMessages.location.cepInvalid, 400),
    );
  });
});
