import { User, UserProps } from '../../../domain/users/user';
import { UserInMemoryRepository } from './user-in-memory.repository';

describe('UserInMemoryRepository Test', () => {
  it('should insert a new user', async () => {
    const repository = new UserInMemoryRepository();
    const userProps: UserProps = {
      name: 'Test',
      email: 'test@test.com',
      password: 'test',
      createdAt: new Date(),
    };
    const user = new User(userProps);
    await repository.create(user);
    expect(repository.items).toHaveLength(1);
    expect(repository.items).toStrictEqual([user]);
  });
});
