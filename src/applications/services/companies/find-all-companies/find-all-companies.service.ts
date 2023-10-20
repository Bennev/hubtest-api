import { Company } from '../../../../domain/companies/company';
import { CompanyRepositoryInterface } from '../../../../domain/companies/company.repository';

export class FindAllCompaniesService {
  constructor(private companyRepository: CompanyRepositoryInterface) {}

  async execute({ where }: { where?: Partial<Company> }): Promise<Company[]> {
    const companies = await this.companyRepository.findAll({
      where,
    });

    return companies;
  }
}
