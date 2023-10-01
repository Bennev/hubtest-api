import { CompanyRepositoryInterface } from '../../../../domain/companies/company.repository';
import { DefaultError } from '../../../errors/default-error';
import { errorMessages } from '../../../errors/error-messages';

export class RemoveCompanyService {
  constructor(private companyRepository: CompanyRepositoryInterface) {}

  async execute(companyId: string): Promise<void> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!company) throw new DefaultError(errorMessages.company.notFound, 404);

    await this.companyRepository.remove(companyId);
  }
}
