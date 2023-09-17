import { User } from '../../../domain/users/user.entity';
import { UserRepositoryInterface } from '../../../domain/users/user.repository';
import { Repository } from 'typeorm';

export class UserTypeOrmRepository implements UserRepositoryInterface {
  constructor(private ormRepo: Repository<User>) {}

  async create(user: User): Promise<void> {
    await this.ormRepo.save(user);
  }

  findOne(id: string): Promise<User> {
    return this.ormRepo.findOne({ where: { id } });
  }

  findAll(): Promise<User[]> {
    return this.ormRepo.find();
  }
}
