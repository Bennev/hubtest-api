import { User } from './user.entity';

export interface UserRepositoryInterface {
  create(user: User): Promise<void>;
  findOne(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
