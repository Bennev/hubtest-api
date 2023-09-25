import { DataSource } from 'typeorm';
import { User } from '../../../../domain/users/user';
import { UserTypeOrm } from './user.entity';

describe('UserTypeOrm Tests', () => {
  test('create', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: './src/infra/database/typeorm/shared/db.sql',
      synchronize: true,
      logging: false,
      entities: [UserTypeOrm],
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
