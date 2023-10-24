import { Company } from 'src/domain/companies/company';
import { Location } from '../../../../../domain/locations/location';
import { LocationTypeOrm } from '../../entities/location.entity';
import { User } from 'src/domain/users/user';

export default class LocationMapper {
  public static toTypeOrm(location: Partial<Location>): LocationTypeOrm {
    const locationTypeOrm = new LocationTypeOrm();

    locationTypeOrm.id = location.id;
    locationTypeOrm.name = location.name;
    locationTypeOrm.cep = location.cep;
    locationTypeOrm.street = location.street;
    locationTypeOrm.number = location.number;
    locationTypeOrm.neighborhood = location.neighborhood;
    locationTypeOrm.city = location.city;
    locationTypeOrm.state = location.state;
    locationTypeOrm.company = location.company;
    locationTypeOrm.createdAt = location.createdAt;
    locationTypeOrm.updatedAt = location.updatedAt;

    return locationTypeOrm;
  }

  public static toLocal(locationTypeOrm: LocationTypeOrm): Location {
    const companyTypeOrm = locationTypeOrm.company;
    const newCompany = new Company({
      id: companyTypeOrm.id,
      name: companyTypeOrm.name,
      website: companyTypeOrm.website,
      cnpj: companyTypeOrm.cnpj,
      user: new User(companyTypeOrm.user),
      createdAt: companyTypeOrm.createdAt,
      updatedAt: companyTypeOrm.updatedAt,
    });

    return new Location({
      id: locationTypeOrm.id,
      name: locationTypeOrm.name,
      cep: locationTypeOrm.cep,
      street: locationTypeOrm.street,
      number: locationTypeOrm.number,
      neighborhood: locationTypeOrm.neighborhood,
      city: locationTypeOrm.city,
      state: locationTypeOrm.state,
      company: newCompany,
      createdAt: locationTypeOrm.createdAt,
      updatedAt: locationTypeOrm.updatedAt,
    });
  }
}
