import { Company } from '../companies/company';
import { User } from '../users/user';
import { Location } from './location';

describe('Location Test', () => {
  const user = new User({
    name: 'Test-user',
    email: 'test-user@test.com',
    password: 'test-user',
  });
  const company = new Company({
    name: 'Test-company',
    website: 'test-company.com',
    cnpj: '11.222.333/0001-44',
    user,
  });
  const locationProps = {
    id: 'asd123',
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

  it('should be able to create a new location entity with only required properties', () => {
    const location = new Location({
      name: locationProps.name,
      cep: locationProps.cep,
      street: locationProps.street,
      number: locationProps.number,
      neighborhood: locationProps.neighborhood,
      city: locationProps.city,
      state: locationProps.state,
      company: locationProps.company,
    });

    expect(location).toHaveProperty('id');
    expect(location).toHaveProperty('createdAt');
    expect(location).toHaveProperty('updatedAt');
  });

  it('should be able to create a new location entity with all properties', () => {
    const location = new Location(locationProps);

    expect(location.id).toEqual(locationProps.id);
    expect(location.name).toEqual(locationProps.name);
    expect(location.cep).toEqual(locationProps.cep);
    expect(location.street).toEqual(locationProps.street);
    expect(location.number).toEqual(locationProps.number);
    expect(location.neighborhood).toEqual(locationProps.neighborhood);
    expect(location.city).toEqual(locationProps.city);
    expect(location.state).toEqual(locationProps.state);
    expect(location.company).toEqual(locationProps.company);
  });
});
