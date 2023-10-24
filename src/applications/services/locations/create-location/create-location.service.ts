import { Location } from '../../../../domain/locations/location';
import { CompanyRepositoryInterface } from '../../../../domain/companies/company.repository';
import { LocationRepositoryInterface } from '../../../../domain/locations/location.repository';
import { CreateLocationDtoInterface } from './create-location.dto';
import { DefaultError } from '../../../errors/default-error';
import { errorMessages } from '../../../errors/error-messages';

export class CreateLocationService {
  constructor(
    private locationRepository: LocationRepositoryInterface,
    private companyRepository: CompanyRepositoryInterface,
  ) {}

  async execute({
    name,
    cep,
    street,
    number,
    neighborhood,
    city,
    state,
    companyId,
  }: CreateLocationDtoInterface): Promise<Location> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!company) throw new DefaultError(errorMessages.company.notFound, 404);

    const formattedName = name.replace(/\s+/g, ' ').trim();
    const cepOnlyNumbers = cep.replace(/\D/g, '');
    const CEP_LENGTH = 8;

    if (!cepOnlyNumbers || cepOnlyNumbers.length !== CEP_LENGTH)
      throw new DefaultError(errorMessages.location.cepInvalid, 400);

    const location = new Location({
      name: formattedName,
      cep: cepOnlyNumbers,
      street,
      number,
      neighborhood,
      city,
      state,
      company,
    });

    return await this.locationRepository.create(location);
  }
}
