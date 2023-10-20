import { CompanyInMemoryRepository } from '../../../../infra/database/in-memory/company-in-memory.repository';
import { FindOneCompanyService } from './find-one-company.service';
import { Company } from '../../../../domain/companies/company';
import { User } from '../../../../domain/users/user';
import { DefaultError } from '../../../errors/default-error';
import { errorMessages } from '../../../errors/error-messages';

describe('Find One Company', () => {
  const companyRepository = new CompanyInMemoryRepository();
  const findOneCompanyService = new FindOneCompanyService(companyRepository);

  it('should be able to find a company', async () => {
    const user = new User({
      name: 'test-name',
      email: 'test@email.com',
      password: 'test-password',
    });
    const company = await companyRepository.create(
      new Company({
        name: 'Test',
        website: 'test.com',
        cnpj: '11.222.333/0001-44',
        user,
      }),
    );

    const companyFound = await findOneCompanyService.execute(company.id);

    expect(companyFound).toBeDefined();
    expect(companyFound).toHaveProperty('id');
  });

  it('should not be able to find a company that does not exists', () => {
    expect(async () => {
      await findOneCompanyService.execute('fake-companyId');
    }).rejects.toThrow(new DefaultError(errorMessages.company.notFound, 404));
  });
});
