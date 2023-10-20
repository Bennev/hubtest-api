import { Company } from 'src/domain/companies/company';
import { UserView } from '../users/user.view';

export class CompanyView {
  static toView(company: Company) {
    return {
      id: company.id,
      name: company.name,
      website: company.website,
      cnpj: company.cnpj,
      user: company.user ? UserView.toView(company.user) : null,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };
  }
}
