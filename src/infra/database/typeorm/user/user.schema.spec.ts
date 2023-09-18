import { DataSource } from 'typeorm';
import { User } from '../../../../domain/users/user.entity';
import { UserSchema } from './user.schema';

describe('UserSchema Tests', () => {
  test('create', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: '../db.sql',
      synchronize: true,
      logging: false,
      entities: [UserSchema],
    });
    await dataSource.initialize();
    const user = new User({
      name: 'Test',
      email: 'test@test.com',
      password: 'test',
      createdAt: new Date(),
    });
    const userRepo = dataSource.getRepository(User);
    await userRepo.save(user);
    console.log(await userRepo.findOne({ where: { id: user.id } }));
  });
});
