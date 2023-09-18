import { User } from '../../../../domain/users/user.entity';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<User>({
  name: 'user',
  target: User,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    name: {
      type: String,
      length: 255,
    },
    email: {
      type: String,
      length: 255,
    },
    password: {
      type: String,
      length: 255,
    },
    createdAt: {
      type: Date,
    },
  },
});
