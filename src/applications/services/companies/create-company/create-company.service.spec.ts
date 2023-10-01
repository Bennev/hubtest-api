import { CompanyInMemoryRepository } from '../../../../infra/database/in-memory/company-in-memory.repository';
import { CreateCompanyService } from './create-company.service';
import { UserInMemoryRepository } from '../../../../infra/database/in-memory/user-in-memory.repository';
import { CreateUserService } from '../../users/create-user/create-user.service';
import { MockHasher } from '../../../ports/mock.hasher.port';

describe('Create Company Service', () => {
  const companyRepository = new CompanyInMemoryRepository();
  const userRepository = new UserInMemoryRepository();
  const hasherPort = new MockHasher();
  const createCompanyService = new CreateCompanyService(
    companyRepository,
    userRepository,
  );
  const createUserService = new CreateUserService(userRepository, hasherPort);

  it('should be able to create company', async () => {
    const user = await createUserService.execute({
      name: 'test-name',
      email: 'test@email.com',
      password: 'test-password',
    });
    const company = await createCompanyService.execute({
      name: ' Test       123 ',
      website: 'test.com',
      cnpj: '11.222.333/0001-44',
      userId: user.id,
    });

    expect(company).toBeDefined();
    expect(company).toHaveProperty('id');
    expect(company.name).toBe('Test 123');
    expect(company.cnpj).toBe('11.222.333/0001-44'.replace(/[^\d]+/g, ''));
    expect(companyRepository.items).toHaveLength(2);
  });
});
