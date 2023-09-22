import { DefaultError } from '../../../errors/default-error';
import { User } from '../../../../domain/users/user';
import { UserRepositoryInterface } from '../../../../domain/users/user.repository';
import { errorMessages } from '../../../../applications/errors/error-messages';

export class FindOneUserService {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new DefaultError(errorMessages.user.notFound, 404);

    return user;
  }
}
