import { HasherPort } from '../../../ports/hasher.port';
import { User } from '../../../../domain/users/user';
import { CreateUserDto } from './create-user.dto';
import { UserRepositoryInterface } from '../../../../domain/users/user.repository';
import { errorMessages } from '../../../errors/error-messages';
import { DefaultError } from '../../../errors/default-error';

export class CreateUserService {
  constructor(
    private user: UserRepositoryInterface,
    private hashPort: HasherPort,
  ) {}

  async execute({ name, email, password }: CreateUserDto): Promise<User> {
    const emailAlreadyExists = await this.user.findOne({ where: { email } });

    if (emailAlreadyExists)
      throw new DefaultError(errorMessages.email.alreadyUsed, 400);

    const hashedPassword = await this.hashPort.hash(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await this.user.create(user);

    return user;
  }
}
