import { UserRepositoryInterface } from '../../../domain/users/user.repository';
import { User } from '../../../domain/users/user';

export class UserInMemoryRepository implements UserRepositoryInterface {
  items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async findOne(id: string): Promise<User> {
    return this.items.find((item) => item.id === id);
  }

  async findAll(): Promise<User[]> {
    return this.items;
  }
}
