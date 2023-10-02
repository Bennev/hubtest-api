import { Location } from '../../../../../domain/locations/location';
import { LocationTypeOrm } from '../../entities/location.entity';

export default class LocationMapper {
  public static toTypeOrm(location: Location): LocationTypeOrm {
    const locationTypeOrm = new LocationTypeOrm();

    locationTypeOrm.id = location.id;
    locationTypeOrm.name = location.name;
    locationTypeOrm.cep = location.cep;
    locationTypeOrm.street = location.street;
    locationTypeOrm.number = location.number;
    locationTypeOrm.neighborhood = location.neighborhood;
    locationTypeOrm.city = location.city;
    locationTypeOrm.state = location.state;
    locationTypeOrm.company.id = location.companyId;
    locationTypeOrm.createdAt = location.createdAt;
    locationTypeOrm.updatedAt = location.updatedAt;

    return locationTypeOrm;
  }

  public static toLocal(location: LocationTypeOrm): Location {
    return new Location({
      id: location.id,
      name: location.name,
      cep: location.cep,
      street: location.street,
      number: location.number,
      neighborhood: location.neighborhood,
      city: location.city,
      state: location.state,
      companyId: location.company.id,
      createdAt: location.createdAt,
      updatedAt: location.updatedAt,
    });
  }
}
