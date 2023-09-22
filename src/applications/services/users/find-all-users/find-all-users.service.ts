import { User } from '../../../../domain/users/user';
import { UserRepositoryInterface } from '../../../../domain/users/user.repository';

export class FindAllUsersService {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
