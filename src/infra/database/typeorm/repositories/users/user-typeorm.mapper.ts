import { User } from '../../../../../domain/users/user';
import { UserTypeOrm } from '../../entities/user.entity';

export default class UserMapper {
  public static toTypeOrm(user: Partial<User>): UserTypeOrm {
    const userTypeOrm = new UserTypeOrm();

    userTypeOrm.id = user.id;
    userTypeOrm.name = user.name;
    userTypeOrm.email = user.email;
    userTypeOrm.password = user.password;
    userTypeOrm.createdAt = user.createdAt;

    return userTypeOrm;
  }

  public static toLocal(user: UserTypeOrm): User {
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
    });
  }
}
