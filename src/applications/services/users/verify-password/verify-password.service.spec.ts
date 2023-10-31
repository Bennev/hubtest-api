import { UserInMemoryRepository } from '../../../../infra/database/in-memory/user-in-memory.repository';
import { VerifyPasswordService } from './verify-password.service';
import { MockHasher } from '../../../ports/mock.hasher.port';
import { CreateUserService } from '../create-user/create-user.service';
import { User } from '../../../../domain/users/user';
import { DefaultError } from '../../../errors/default-error';
import { errorMessages } from '../../../errors/error-messages';

describe('Verify Password', () => {
  let user: User;
  const userRepository = new UserInMemoryRepository();
  const hasherPort = new MockHasher();

  const createUserService = new CreateUserService(userRepository, hasherPort);

  const verifyPasswordService = new VerifyPasswordService(
    userRepository,
    hasherPort,
  );

  beforeAll(async () => {
    user = await createUserService.execute({
      name: 'test-name',
      email: 'test@email.com',
      password: 'test-password',
    });
  });

  it('should be able to verify password and return user', async () => {
    const verifiedUser = await verifyPasswordService.execute({
      email: user.email,
      password: 'test-password',
    });

    expect(verifiedUser).toBeDefined();
  });

  it('should not be able to verify password with wrong email', () => {
    expect(async () => {
      await verifyPasswordService.execute({
        email: 'fake-email@email.com',
        password: 'test-password',
      });
    }).rejects.toThrowError(
      new DefaultError(errorMessages.user.invalidEmailOrPassword, 401),
    );
  });

  it('should not be able to verify password with wrong password', () => {
    expect(async () => {
      await verifyPasswordService.execute({
        email: user.email,
        password: 'fake-password',
      });
    }).rejects.toThrowError(
      new DefaultError(errorMessages.user.invalidEmailOrPassword, 401),
    );
  });

  it('should not be able to verify password of an inexistent user', () => {
    expect(async () => {
      await verifyPasswordService.execute({
        email: 'fake-email@email.com',
        password: 'fake-password',
      });
    }).rejects.toThrowError();
  });
});
