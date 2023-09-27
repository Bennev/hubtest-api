import { HasherPort } from '../../../ports/hasher.port';
import { JwtPort } from '../../../ports/jwt.port';
import { UserRepositoryInterface } from 'src/domain/users/user.repository';
import { AuthUserDto } from './auth-user.dto';
import { DefaultError } from '../../../errors/default-error';
import { errorMessages } from '../../../errors/error-messages';

export class AuthUserService {
  constructor(
    private userRepository: UserRepositoryInterface,
    private hasherPort: HasherPort,
    private jwtPort: JwtPort,
  ) {}

  async execute({ email, password }: AuthUserDto) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user)
      throw new DefaultError(errorMessages.user.invalidEmailOrPassword, 401);

    const verifyPassword = this.hasherPort.compare(password, user.password);

    if (!verifyPassword)
      throw new DefaultError(errorMessages.user.invalidEmailOrPassword, 401);

    const token = this.jwtPort.create({
      id: user.id,
      email: user.email,
    });

    return token;
  }
}
