import { User } from '../../../domain/users/user';
import { Location, LocationProps } from '../../../domain/locations/location';
import { LocationInMemoryRepository } from './location-in-memory.repository';
import { Company } from '../../../domain/companies/company';

describe('LocationInMemoryRepository Test', () => {
  it('should insert a location user', async () => {
    const repository = new LocationInMemoryRepository();
    const user = new User({
      name: 'Test',
      email: 'test@test.com',
      password: 'test',
    });
    const company = new Company({
      name: 'Test',
      website: 'test.com',
      cnpj: '11.222.333/0001-44',
      user,
    });
    const locationProps: LocationProps = {
      name: 'Test',
      cep: '11.222-333',
      street: 'street test',
      number: '123456',
      neighborhood: 'neighborhood',
      city: 'city',
      state: 'state',
      company,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const location = new Location(locationProps);
    await repository.create(location);
    expect(repository.items).toHaveLength(1);
    expect(repository.items).toStrictEqual([location]);
  });
});
