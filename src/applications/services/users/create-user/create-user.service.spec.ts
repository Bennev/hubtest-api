import { MockHasher } from '../../../ports/mock.hasher.port';
import { UserInMemoryRepository } from '../../../../infra/database/in-memory/user-in-memory.repository';
import { CreateUserService } from './create-user.service';

describe('Create User Service', () => {
  const userRepository = new UserInMemoryRepository();
  const mockedHasher = new MockHasher();
  const createUserService = new CreateUserService(userRepository, mockedHasher);

  it('should be able to create user', async () => {
    const user = await createUserService.execute({
      name: 'test-name',
      email: 'test@email.com',
      password: 'test-password',
    });

    expect(user).toBeDefined();
    expect(userRepository.items).toHaveLength(1);
  });
});
