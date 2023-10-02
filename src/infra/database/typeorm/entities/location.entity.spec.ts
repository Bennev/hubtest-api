import { DataSource } from 'typeorm';
import { Location } from '../../../../domain/locations/location';
import { LocationTypeOrm } from './location.entity';
import { User } from '../../../../domain/users/user';
import { Company } from '../../../../domain/companies/company';

describe('LocationTypeOrm Tests', () => {
  test('create', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: './src/infra/database/typeorm/shared/db.sql',
      synchronize: true,
      logging: false,
      entities: [LocationTypeOrm],
    });
    await dataSource.initialize();
    const user = new User({
      name: 'Test',
      email: 'test@test.com',
      password: 'test',
    });
    const company = new Company({
      name: 'Test',
      website: 'test.com',
      cnpj: '11.222.333/0001-44',
      userId: user.id,
    });
    const location = new Location({
      name: 'Test',
      cep: '11.222-333',
      street: 'street test',
      number: '123456',
      neighborhood: 'neighborhood',
      city: 'city',
      state: 'state',
      companyId: company.id,
    });
    const locationRepo = dataSource.getRepository(Location);
    await locationRepo.save(location);
    console.log(await locationRepo.findOne({ where: { id: location.id } }));
  });
});
