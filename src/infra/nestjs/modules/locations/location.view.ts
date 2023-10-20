import { Location } from 'src/domain/locations/location';
import { CompanyView } from '../companies/company.view';

export class LocationView {
  static toView(location: Location) {
    return {
      id: location.id,
      name: location.name,
      cep: location.cep,
      street: location.street,
      number: location.number,
      neighborhood: location.neighborhood,
      city: location.city,
      state: location.state,
      company: location.company ? CompanyView.toView(location.company) : null,
      createdAt: location.createdAt,
      updatedAt: location.updatedAt,
    };
  }
}
