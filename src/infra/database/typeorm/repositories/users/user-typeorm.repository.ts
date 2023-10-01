import { User } from '../../../../../domain/users/user';
import { UserRepositoryInterface } from '../../../../../domain/users/user.repository';
import { Repository } from 'typeorm';
import UserMapper from './user-typeorm.mapper';

export class UserTypeOrmRepository implements UserRepositoryInterface {
  constructor(private ormRepo: Repository<User>) {}

  async create(user: User): Promise<User> {
    const newUser = UserMapper.toTypeOrm(user);

    return UserMapper.toLocal(await this.ormRepo.save(newUser));
  }

  //ERROR
  async findOne({ where }: { where: Partial<User> }): Promise<User> {
    const newUser = UserMapper.toTypeOrm(where);

    const userFound = await this.ormRepo.findOne({ where: newUser });

    if (!userFound) return null;
    return UserMapper.toLocal(userFound);
  }

  //ERROR
  async findAll(): Promise<User[]> {
    const users = await this.ormRepo.find();

    return users.map((user) => UserMapper.toLocal(user));
  }
}
