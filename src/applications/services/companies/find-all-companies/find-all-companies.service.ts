import { Company } from '../../../../domain/companies/company';
import { CompanyRepositoryInterface } from '../../../../domain/companies/company.repository';

export class FindAllCompaniesService {
  constructor(private companyRepository: CompanyRepositoryInterface) {}

  async execute(userId: string): Promise<Company[]> {
    const companies = await this.companyRepository.findAll({
      where: { userId },
    });

    return companies;
  }
}
