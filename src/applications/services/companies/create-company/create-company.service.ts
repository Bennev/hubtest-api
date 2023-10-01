import { UserRepositoryInterface } from '../../../../domain/users/user.repository';
import { CompanyRepositoryInterface } from '../../../../domain/companies/company.repository';
import { CreateCompanyDto } from './create-company.dto';
import { DefaultError } from '../../../errors/default-error';
import { errorMessages } from '../../../errors/error-messages';
import { Company } from '../../../../domain/companies/company';

export class CreateCompanyService {
  constructor(
    private companyRepository: CompanyRepositoryInterface,
    private userRepository: UserRepositoryInterface,
  ) {}

  async execute({
    name,
    cnpj,
    website,
    userId,
  }: CreateCompanyDto): Promise<Company> {
    const formattedName = name.replace(/\s+/g, ' ').trim();
    const isCnpj = cnpj.replace(/[^\d]+/g, '');
    const CNPJ_LENGTH = 14;

    if (!isCnpj || isCnpj.length !== CNPJ_LENGTH)
      throw new DefaultError(errorMessages.company.cnpjInvalid, 400);

    const companyWithSameCnpj = await this.companyRepository.findOne({
      where: { cnpj: isCnpj },
    });

    if (companyWithSameCnpj)
      throw new DefaultError(errorMessages.company.cnpjAlreadyInUse, 400);

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new DefaultError(errorMessages.user.notFound, 400);

    const company = new Company({
      name: formattedName,
      website,
      cnpj: isCnpj,
      userId,
    });

    return await this.companyRepository.create(company);
  }
}
