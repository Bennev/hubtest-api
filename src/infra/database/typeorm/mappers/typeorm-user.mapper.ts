import { User } from '../../../../domain/users/user';
import { UserSchema } from '../schemas/user.schema';

export default class TypeOrmMapper {
  static toTypeOrm(user: User) {
    return {
      id: user.id,
    };
  }
}
