import { CompanyInMemoryRepository } from '../../../../infra/database/in-memory/company-in-memory.repository';
import { FindAllCompaniesService } from './find-all-companies.service';
import { Company } from '../../../../domain/companies/company';
import { User } from '../../../../domain/users/user';

describe('Find All Companies by User', () => {
  const companyRepository = new CompanyInMemoryRepository();
  const findAllCompaniesService = new FindAllCompaniesService(
    companyRepository,
  );

  it('should be able to find all companies by user', async () => {
    const user = new User({
      name: 'test-name',
      email: 'test@email.com',
      password: 'test-password',
    });
    await companyRepository.create(
      new Company({
        name: 'Test',
        website: 'test.com',
        cnpj: '11.222.333/0001-44',
        user,
      }),
    );

    const fakeUser = new User({
      name: 'fake-name',
      email: 'fake@email.com',
      password: 'fake-password',
    });

    await companyRepository.create(
      new Company({
        name: 'Test',
        website: 'test.com',
        cnpj: '11.222.333/0001-44',
        user: fakeUser,
      }),
    );

    const companies = await findAllCompaniesService.execute({
      where: { user },
    });

    expect(companies).toBeDefined();
    expect(companies).toHaveLength(1);
  });
});
