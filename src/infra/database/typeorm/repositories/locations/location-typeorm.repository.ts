import { Location } from '../../../../../domain/locations/location';
import { LocationRepositoryInterface } from '../../../../../domain/locations/location.repository';
import { Repository } from 'typeorm';
import LocationMapper from './location-typeorm.mapper';

export class LocationTypeOrmRepository implements LocationRepositoryInterface {
  constructor(private ormRepo: Repository<Location>) {}

  async create(company: Location): Promise<Location> {
    const newLocation = LocationMapper.toTypeOrm(company);

    return LocationMapper.toLocal(await this.ormRepo.save(newLocation));
  }

  //ERROR
  async findOne({ where }: { where: Partial<Location> }): Promise<Location> {
    const newLocation = LocationMapper.toTypeOrm(where);

    const locationFound = await this.ormRepo.findOne({ where: newLocation });

    if (!locationFound) return null;
    return LocationMapper.toLocal(locationFound);
  }

  //ERROR
  async findAll({ where }: { where: Partial<Location> }): Promise<Location[]> {
    const locations = await this.ormRepo.find();
    if (where.companyId) {
      const locationsByUser = locations.filter(
        (location) => location.companyId === where.companyId,
      );
      return locationsByUser.map((location) =>
        LocationMapper.toLocal(location),
      );
    }

    return locations.map((location) => LocationMapper.toLocal(location));
  }

  async update(updatedLocation: Location): Promise<void> {
    const location = LocationMapper.toTypeOrm(updatedLocation);
    await this.ormRepo
      .createQueryBuilder()
      .update(location)
      .set({
        ...location,
      })
      .where('id = :id', { id: location.id })
      .execute();
  }

  async remove(locationId: string): Promise<void> {
    await this.ormRepo.delete(locationId);
  }
}
