import { HasherPort } from '../../../ports/hasher.port';
import { UserRepositoryInterface } from '../../../../domain/users/user.repository';
import { AuthUserDto } from '../../auth/auth-user/auth-user.dto';
import { DefaultError } from '../../../errors/default-error';
import { errorMessages } from '../../../errors/error-messages';
import { User } from '../../../../domain/users/user';

export class VerifyPasswordService {
  constructor(
    private userRepository: UserRepositoryInterface,
    private hasherPort: HasherPort,
  ) {}

  async execute({ email, password }: AuthUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user)
      throw new DefaultError(errorMessages.user.invalidEmailOrPassword, 401);

    const verifyPassword = this.hasherPort.compare(password, user.password);

    if (!verifyPassword)
      throw new DefaultError(errorMessages.user.invalidEmailOrPassword, 401);

    return user;
  }
}
