import { DefaultError } from '../../../errors/default-error';
import { UserRepositoryInterface } from '../../../../domain/users/user.repository';
import { JwtPort } from '../../../ports/jwt.port';
import { errorMessages } from '../../../errors/error-messages';

export class AuthUserService {
  constructor(
    private userRepository: UserRepositoryInterface,
    private jwtPort: JwtPort,
  ) {}

  async execute(userId: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user)
      throw new DefaultError(errorMessages.user.invalidEmailOrPassword, 401);

    const payload = { sub: userId };

    const token = this.jwtPort.create(payload);

    return token;
  }
}
