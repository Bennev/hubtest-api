import { User } from '../../../domain/users/user';
import { Company, CompanyProps } from '../../../domain/companies/company';
import { CompanyInMemoryRepository } from './company-in-memory.repository';

describe('CompanyInMemoryRepository Test', () => {
  it('should insert a company user', async () => {
    const repository = new CompanyInMemoryRepository();
    const user = new User({
      name: 'test-name',
      email: 'test@email.com',
      password: 'test-password',
    });
    const companyProps: CompanyProps = {
      name: 'Test',
      website: 'test.com',
      cnpj: '11.222.333/0001-44',
      user,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const company = new Company(companyProps);
    await repository.create(company);
    expect(repository.items).toHaveLength(1);
    expect(repository.items).toStrictEqual([company]);
  });
});
