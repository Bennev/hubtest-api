import { User } from 'src/domain/users/user';

export class UserView {
  static toView(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
