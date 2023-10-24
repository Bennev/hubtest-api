import { User } from 'src/domain/users/user';
import { Company } from '../../../../../domain/companies/company';
import { CompanyTypeOrm } from '../../entities/company.entity';

export default class CompanyMapper {
  public static toTypeOrm(company: Company | Partial<Company>): CompanyTypeOrm {
    const companyTypeOrm = new CompanyTypeOrm();

    companyTypeOrm.id = company.id;
    companyTypeOrm.name = company.name;
    companyTypeOrm.website = company.website;
    companyTypeOrm.cnpj = company.cnpj;
    companyTypeOrm.user = company.user;
    companyTypeOrm.createdAt = company.createdAt;
    companyTypeOrm.updatedAt = company.updatedAt;

    return companyTypeOrm;
  }

  public static toLocal(companyTypeOrm: CompanyTypeOrm): Company {
    return new Company({
      id: companyTypeOrm.id,
      name: companyTypeOrm.name,
      website: companyTypeOrm.website,
      cnpj: companyTypeOrm.cnpj,
      user: new User(companyTypeOrm.user),
      createdAt: companyTypeOrm.createdAt,
      updatedAt: companyTypeOrm.updatedAt,
    });
  }
}
