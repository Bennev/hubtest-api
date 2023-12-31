import { User } from '../users/user';
import { Company } from './company';

describe('Company Test', () => {
  const user = new User({
    name: 'Test',
    email: 'test@test.com',
    password: 'test',
  });
  const companyProps = {
    id: 'asd123',
    name: 'Test',
    website: 'test.com',
    cnpj: '11.222.333/0001-44',
    user,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should be able to create a new company entity with only required properties', () => {
    const company = new Company({
      name: companyProps.name,
      website: companyProps.website,
      cnpj: companyProps.cnpj,
      user: companyProps.user,
    });

    expect(company).toHaveProperty('id');
    expect(company).toHaveProperty('createdAt');
    expect(company).toHaveProperty('updatedAt');
  });

  it('should be able to create a new company entity with all properties', () => {
    const company = new Company(companyProps);

    expect(company.id).toEqual(companyProps.id);
    expect(company.name).toEqual(companyProps.name);
    expect(company.website).toEqual(companyProps.website);
    expect(company.cnpj).toEqual(companyProps.cnpj.replace(/[^\d]+/g, ''));
    expect(company.user).toEqual(companyProps.user);
  });
});
