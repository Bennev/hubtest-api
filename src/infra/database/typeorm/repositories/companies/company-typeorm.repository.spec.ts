import { DataSource } from 'typeorm';
import { CompanyTypeOrm } from '../../entities/company.entity';
import { CompanyTypeOrmRepository } from './company-typeorm.repository';
import { Company, CompanyProps } from '../../../../../domain/companies/company';
import { User } from '../../../../../domain/users/user';

describe('CompanyTypeOrmRepository Test', () => {
  it('should create a new company', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: './src/infra/database/typeorm/shared/db.sql',
      synchronize: true,
      logging: false,
      entities: [CompanyTypeOrm],
    });

    await dataSource.initialize();

    const ormRepo = dataSource.getRepository(Company);
    const repository = new CompanyTypeOrmRepository(ormRepo);
    const companyProps: CompanyProps = {
      name: 'Test',
      website: 'test.com',
      cnpj: '123456',
      user: new User({
        name: 'Test',
        email: 'test@test.com',
        password: 'test',
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const company = new Company(companyProps);
    await repository.create(company);

    const companyFound = await ormRepo.findOne({ where: { id: company.id } });
    expect(companyFound.id).toEqual(company.id);
    expect(companyFound.name).toEqual(company.name);
    expect(companyFound.website).toEqual(company.website);
    expect(companyFound.cnpj).toEqual(company.cnpj);
    expect(companyFound.user).toEqual(company.user);
    expect(companyFound.createdAt).toEqual(company.createdAt);
    expect(companyFound.updatedAt).toEqual(company.updatedAt);
  });
});
