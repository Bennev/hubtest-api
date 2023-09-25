import { User } from '../../../domain/users/user';
import { Company, CompanyProps } from '../../../domain/companies/company';
import { CompanyInMemoryRepository } from './company-in-memory.repository';

describe('CompanyInMemoryRepository Test', () => {
  it('should insert a company user', async () => {
    const repository = new CompanyInMemoryRepository();
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
    expect(repository.items).toHaveLength(1);
    expect(repository.items).toStrictEqual([company]);
  });
});
