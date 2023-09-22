import { User } from './user';

export abstract class UserRepositoryInterface {
  abstract create(user: User): Promise<User>;
  abstract findOne({ where }: { where: Partial<User> }): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
}
