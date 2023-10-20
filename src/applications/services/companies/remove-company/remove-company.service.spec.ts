import { CompanyInMemoryRepository } from '../../../../infra/database/in-memory/company-in-memory.repository';
import { RemoveCompanyService } from './remove-company.service';
import { User } from '../../../../domain/users/user';
import { Company } from '../../../../domain/companies/company';
import { DefaultError } from '../../../errors/default-error';
import { errorMessages } from '../../../errors/error-messages';

describe('Remove Company Service', () => {
  const companyRepository = new CompanyInMemoryRepository();
  const removeCompanyService = new RemoveCompanyService(companyRepository);

  it('should be able to remove a company', async () => {
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

    expect(companyRepository.items).toHaveLength(1);

    await removeCompanyService.execute(company.id);

    const removedCompany = await companyRepository.findOne({
      where: { id: company.id },
    });

    expect(removedCompany).toBeUndefined();
    expect(companyRepository.items).toHaveLength(0);
  });

  it('should not be able to remove a company that does not exists', () => {
    expect(async () => {
      await removeCompanyService.execute('fake-companyId');
    }).rejects.toThrow(new DefaultError(errorMessages.company.notFound, 404));
  });
});
