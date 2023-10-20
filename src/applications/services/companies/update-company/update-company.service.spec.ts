import { CompanyInMemoryRepository } from '../../../../infra/database/in-memory/company-in-memory.repository';
import { UpdateCompanyService } from './update-company.service';
import { User } from '../../../../domain/users/user';
import { Company } from '../../../../domain/companies/company';
import { DefaultError } from '../../../errors/default-error';
import { errorMessages } from '../../../errors/error-messages';

describe('Update Company Service', () => {
  let company: Company;
  const companyRepository = new CompanyInMemoryRepository();
  const updateCompanyService = new UpdateCompanyService(companyRepository);
  const user = new User({
    name: 'test-name',
    email: 'test@email.com',
    password: 'test-password',
  });

  beforeEach(async () => {
    company = await companyRepository.create(
      new Company({
        name: 'Test',
        website: 'test.com',
        cnpj: '11.222.333/0001-44',
        user,
      }),
    );
  });

  it('should be able to update a company', async () => {
    const updatedCompany = await updateCompanyService.execute(
      {
        name: ' updated      name ',
        website: 'updated-website.com',
        cnpj: '44.333.222/0001-11',
      },
      company.id,
    );

    expect(updatedCompany).toBeDefined();
    expect(updatedCompany.name).toBe('updated name');
    expect(updatedCompany.website).toBe('updated-website.com');
    expect(updatedCompany.cnpj).toBe(
      '44.333.222/0001-11'.replace(/[^\d]+/g, ''),
    );
  });

  it('should not be able to update a company with a invalid cnpj', () => {
    expect(async () => {
      await updateCompanyService.execute(
        {
          cnpj: '123',
        },
        company.id,
      );
    }).rejects.toThrow(
      new DefaultError(errorMessages.company.cnpjInvalid, 400),
    );
  });

  it('should not be able to update a company with a cnpj already used', async () => {
    const newCompany = await companyRepository.create(
      new Company({
        name: 'Test',
        website: 'test.com',
        cnpj: '44.333.222/0001-11',
        user,
      }),
    );

    expect(async () => {
      await updateCompanyService.execute(
        {
          cnpj: '11.222.333/0001-44',
        },
        newCompany.id,
      );
    }).rejects.toThrow(
      new DefaultError(errorMessages.company.cnpjAlreadyInUse, 400),
    );
  });

  it('should not be able to update a company that does not exists', () => {
    expect(async () => {
      await updateCompanyService.execute(
        {
          name: ' updated      name ',
          website: 'updated-website.com',
          cnpj: '44.333.222/0001-11',
        },
        'fake-companyId',
      );
    }).rejects.toThrow(new DefaultError(errorMessages.company.notFound, 404));
  });
});
