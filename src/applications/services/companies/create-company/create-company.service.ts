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
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new DefaultError(errorMessages.user.notFound, 400);

    const company = new Company({
      name,
      website,
      cnpj,
      user,
    });

    return await this.companyRepository.create(company);
  }
}
