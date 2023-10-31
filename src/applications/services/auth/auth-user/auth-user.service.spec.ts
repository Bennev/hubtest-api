import { MockHasher } from '../../../ports/mock.hasher.port';
import { MockJwtPort } from '../../../ports/mock.jwt.port';
import { UserInMemoryRepository } from '../../../../infra/database/in-memory/user-in-memory.repository';
import { CreateUserService } from '../../users/create-user/create-user.service';
import { AuthUserService } from './auth-user.service';
import { User } from '../../../../domain/users/user';

describe('Auth User Service', () => {
  let user: User;
  const userRepository = new UserInMemoryRepository();
  const hasherPort = new MockHasher();
  const jwtPort = new MockJwtPort();

  const createUserService = new CreateUserService(userRepository, hasherPort);

  const authUserService = new AuthUserService(userRepository, jwtPort);

  beforeAll(async () => {
    user = await createUserService.execute({
      name: 'test-name',
      email: 'test@email.com',
      password: 'test-password',
    });
  });

  it('should be able to authenticate an user', async () => {
    const token = await authUserService.execute(user.id);

    expect(token).toBeDefined();
  });

  it('should not be able to authenticate an inexistent user', () => {
    expect(async () => {
      await authUserService.execute('fake-userId');
    }).rejects.toThrowError();
  });
});
