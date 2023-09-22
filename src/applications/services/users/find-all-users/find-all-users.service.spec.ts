import { User } from '../../../../domain/users/user';
import { UserInMemoryRepository } from '../../../../infra/database/in-memory/user-in-memory.repository';
import { FindAllUsersService } from './find-all-users.service';

describe('Find All Users', () => {
  const userRepository = new UserInMemoryRepository();
  const findAllUsers = new FindAllUsersService(userRepository);

  userRepository.create(
    new User({
      name: 'test-name',
      email: 'test@email.com',
      password: 'test-password',
    }),
  );

  it('should be able to find all users', async () => {
    const allUsers = await findAllUsers.execute();

    expect(allUsers).toHaveLength(1);
  });
});
