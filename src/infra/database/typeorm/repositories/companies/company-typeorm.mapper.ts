import { Company } from '../../../../../domain/companies/company';
import { CompanyTypeOrm } from '../../entities/company.entity';
import UserMapper from '../users/user-typeorm.mapper';

export default class CompanyMapper {
  public static toTypeOrm(company: Partial<Company>): CompanyTypeOrm {
    const companyTypeOrm = new CompanyTypeOrm();

    companyTypeOrm.id = company.id;
    companyTypeOrm.name = company.name;
    companyTypeOrm.website = company.website;
    companyTypeOrm.cnpj = company.cnpj;
    companyTypeOrm.user.id = company.userId;
    companyTypeOrm.createdAt = company.createdAt;
    companyTypeOrm.updatedAt = company.updatedAt;

    return companyTypeOrm;
  }

  public static toLocal(company: CompanyTypeOrm): Company {
    return new Company({
      id: company.id,
      name: company.name,
      website: company.website,
      cnpj: company.cnpj,
      userId: UserMapper.toLocal(company.user).id,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    });
  }
}
