import { UserRepositoryInterface } from '../../../domain/users/user.repository';
import { User } from '../../../domain/users/user';

export class UserInMemoryRepository implements UserRepositoryInterface {
  items: User[] = [];

  async create(user: User): Promise<User> {
    this.items.push(user);

    return user;
  }

  async findOne({ where }: { where: Partial<User> }): Promise<User> {
    if (where.email)
      return this.items.find((item) => item.email === where.email);

    return this.items.find((item) => item.id === where.id);
  }

  async findAll(): Promise<User[]> {
    return this.items;
  }
}
