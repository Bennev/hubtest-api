import { User } from './user';

describe('User Test', () => {
  const userProps = {
    id: 'test123',
    name: 'Test',
    email: 'test@test.com',
    password: 'test',
    createdAt: new Date(),
  };

  it('should be able to create a new user entity with only required properties', () => {
    const user = new User({
      name: userProps.name,
      email: userProps.email,
      password: userProps.password,
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('createdAt');
  });

  it('should be able to create a new user entity with all properties', () => {
    const user = new User(userProps);

    expect(user.id).toEqual(userProps.id);
    expect(user.name).toEqual(userProps.name);
    expect(user.email).toEqual(userProps.email);
    expect(user.password).toEqual(userProps.password);
  });
});
