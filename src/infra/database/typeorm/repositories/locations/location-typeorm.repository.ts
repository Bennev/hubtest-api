import { Location } from '../../../../../domain/locations/location';
import { LocationRepositoryInterface } from '../../../../../domain/locations/location.repository';
import { Repository } from 'typeorm';
import LocationMapper from './location-typeorm.mapper';
import { LocationTypeOrm } from '../../entities/location.entity';

export class LocationTypeOrmRepository implements LocationRepositoryInterface {
  constructor(private ormRepo: Repository<LocationTypeOrm>) {}

  async create(company: Location): Promise<Location> {
    const newLocation = LocationMapper.toTypeOrm(company);

    return LocationMapper.toLocal(await this.ormRepo.save(newLocation));
  }

  async findOne({ where }: { where: Partial<Location> }): Promise<Location> {
    const newLocation = LocationMapper.toTypeOrm(where);

    const locationFound = await this.ormRepo.findOne({
      where: newLocation,
      relations: {
        company: {
          user: true,
        },
      },
    });

    if (!locationFound) return null;
    return LocationMapper.toLocal(locationFound);
  }

  async findAll({ where }: { where: Partial<Location> }): Promise<Location[]> {
    const locations = await this.ormRepo.find({
      relations: {
        company: {
          user: true,
        },
      },
    });
    if (where.company) {
      const locationsByUser = locations.filter(
        (location) => location.company.id === where.company.id,
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
