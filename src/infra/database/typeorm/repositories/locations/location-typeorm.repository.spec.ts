import { DataSource } from 'typeorm';
import { LocationTypeOrm } from '../../entities/location.entity';
import { LocationTypeOrmRepository } from './location-typeorm.repository';
import { User } from '../../../../../domain/users/user';
import { Company } from '../../../../../domain/companies/company';
import {
  Location,
  LocationProps,
} from '../../../../../domain/locations/location';

describe('LocationTypeOrmRepository Test', () => {
  it('should create a new location', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: './src/infra/database/typeorm/shared/db.sql',
      synchronize: true,
      logging: false,
      entities: [LocationTypeOrm],
    });

    await dataSource.initialize();

    const ormRepo = dataSource.getRepository(LocationTypeOrm);
    const repository = new LocationTypeOrmRepository(ormRepo);
    const user = new User({
      name: 'Test',
      email: 'test@test.com',
      password: 'test',
    });
    const company = new Company({
      name: ' Test       123 ',
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

    const locationFound = await ormRepo.findOne({ where: { id: location.id } });
    expect(locationFound.id).toEqual(location.id);
    expect(locationFound.name).toEqual(location.name);
    expect(locationFound.cep).toEqual(location.cep);
    expect(locationFound.street).toEqual(location.street);
    expect(locationFound.number).toEqual(location.number);
    expect(locationFound.neighborhood).toEqual(location.neighborhood);
    expect(locationFound.city).toEqual(location.city);
    expect(locationFound.state).toEqual(location.state);
    expect(locationFound.company).toEqual(location.company);
    expect(locationFound.createdAt).toEqual(location.createdAt);
    expect(locationFound.updatedAt).toEqual(location.updatedAt);
  });
});
