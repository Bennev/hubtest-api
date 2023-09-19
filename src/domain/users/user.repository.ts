import { User } from './user';

export interface UserRepositoryInterface {
  create(user: User): Promise<void>;
  findOne(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
