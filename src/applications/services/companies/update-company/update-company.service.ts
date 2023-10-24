import { Company } from '../../../../domain/companies/company';
import { CompanyRepositoryInterface } from '../../../../domain/companies/company.repository';
import { UpdateCompanyDtoInterface } from './update-company.dto';
import { DefaultError } from '../../../errors/default-error';
import { errorMessages } from '../../../errors/error-messages';

export class UpdateCompanyService {
  constructor(private companyRepository: CompanyRepositoryInterface) {}

  async execute(
    { name, website, cnpj }: UpdateCompanyDtoInterface,
    companyId: string,
  ): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!company) throw new DefaultError(errorMessages.company.notFound, 404);

    if (name) {
      const formattedName = name.replace(/\s+/g, ' ').trim();
      company.name = formattedName;
    }

    if (cnpj) {
      const isCnpj = cnpj.replace(/[^\d]+/g, '');
      const CNPJ_LENGTH = 14;

      if (!isCnpj || isCnpj.length !== CNPJ_LENGTH)
        throw new DefaultError(errorMessages.company.cnpjInvalid, 400);

      const companyWithSameCnpj = await this.companyRepository.findOne({
        where: { cnpj: isCnpj },
      });

      if (companyWithSameCnpj && companyWithSameCnpj.id !== companyId)
        throw new DefaultError(errorMessages.company.cnpjAlreadyInUse, 400);

      company.cnpj = isCnpj;
    }

    if (website) company.website = website;

    await this.companyRepository.update(company);

    return company;
  }
}
