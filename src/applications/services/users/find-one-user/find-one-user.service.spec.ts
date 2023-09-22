import { User } from '../../../../domain/users/user';
import { UserInMemoryRepository } from '../../../../infra/database/in-memory/user-in-memory.repository';
import { FindOneUserService } from './find-one-user.service';

describe('Find User', () => {
  const userRepository = new UserInMemoryRepository();
  const findOneUser = new FindOneUserService(userRepository);

  it('should be able to find an user', async () => {
    const user = await userRepository.create(
      new User({
        name: 'test-name',
        email: 'test@email.com',
        password: 'test-password',
      }),
    );

    const getUser = await findOneUser.execute(user.id);

    expect(getUser.id).toEqual(user.id);
  });
});
