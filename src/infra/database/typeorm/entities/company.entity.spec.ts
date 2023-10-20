import { DataSource } from 'typeorm';
import { Company } from '../../../../domain/companies/company';
import { CompanyTypeOrm } from './company.entity';
import { User } from '../../../../domain/users/user';

describe('CompanyTypeOrm Tests', () => {
  test('create', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: './src/infra/database/typeorm/shared/db.sql',
      synchronize: true,
      logging: false,
      entities: [CompanyTypeOrm],
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
      user,
    });
    const companyRepo = dataSource.getRepository(Company);
    await companyRepo.save(company);
    console.log(await companyRepo.findOne({ where: { id: company.id } }));
  });
});
