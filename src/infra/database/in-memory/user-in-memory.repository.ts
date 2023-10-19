import { UserRepositoryInterface } from '../../../domain/users/user.repository';
import { User } from '../../../domain/users/user';

const verifyWhere = ({ where, user }: { where: Partial<User>; user: User }) => {
  if (where?.id && user.id !== where.id) return false;
  if (where?.email && user.email !== where.email) return false;
  if (where?.name && user.name !== where.name) return false;
  return true;
};

export class UserInMemoryRepository implements UserRepositoryInterface {
  items: User[] = [];

  async create(user: User): Promise<User> {
    this.items.push(user);

    return user;
  }

  async findOne({ where }: { where: Partial<User> }): Promise<User> {
    return this.items.find((user) => verifyWhere({ where, user }));
  }

  async findAll(): Promise<User[]> {
    return this.items;
  }
}
