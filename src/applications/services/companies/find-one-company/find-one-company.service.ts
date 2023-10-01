import { Company } from '../../../../domain/companies/company';
import { CompanyRepositoryInterface } from '../../../../domain/companies/company.repository';
import { DefaultError } from '../../../errors/default-error';
import { errorMessages } from '../../../errors/error-messages';

export class FindOneCompanyService {
  constructor(private companyRepository: CompanyRepositoryInterface) {}

  async execute(companyId: string): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!company) throw new DefaultError(errorMessages.company.notFound, 404);

    return company;
  }
}
