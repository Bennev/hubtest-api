import { DataSource } from 'typeorm';
import { UserSchema } from './user.schema';
import { UserTypeOrmRepository } from './user-typeorm.repository';
import { User, UserProps } from '../../../domain/users/user.entity';

describe('UserTypeOrmRepository Test', () => {
  it('should create a new user', async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      database: ':memory:',
      synchronize: true,
      logging: true,
      entities: [UserSchema],
    });

    await dataSource.initialize();

    const ormRepo = dataSource.getRepository(User);
    const repository = new UserTypeOrmRepository(ormRepo);
    const userProps: UserProps = {
      name: 'Test',
      email: 'test@test.com',
      password: 'test',
      createdAt: new Date(),
    };
    const user = new User(userProps);
    await repository.create(user);

    const userFound = await ormRepo.findOne({ where: { id: user.id } });
    expect(userFound.id).toEqual(user.id);
    expect(userFound.name).toEqual(user.name);
    expect(userFound.email).toEqual(user.email);
    expect(userFound.password).toEqual(user.password);
    expect(userFound.createdAt).toEqual(user.createdAt);
  });
});
