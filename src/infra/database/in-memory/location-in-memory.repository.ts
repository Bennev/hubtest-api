import { Location } from 'src/domain/locations/location';
import { LocationRepositoryInterface } from '../../../domain/locations/location.repository';

export class LocationInMemoryRepository implements LocationRepositoryInterface {
  items: Location[] = [];

  async create(location: Location): Promise<Location> {
    this.items.push(location);

    return location;
  }

  async findOne({ where }: { where: Partial<Location> }): Promise<Location> {
    const foundLocation = this.items.find(
      (location) => location.id === where.id,
    );
    return foundLocation;
  }

  async findAll({ where }: { where: Partial<Location> }): Promise<Location[]> {
    if (where.companyId) {
      return this.items.filter(
        (location) => location.companyId === where.companyId,
      );
    }

    return this.items;
  }

  async update(updatedLocation: Location): Promise<void> {
    const locationIndex = this.items.findIndex(
      (location) => location.id === updatedLocation.id,
    );

    this.items[locationIndex] = updatedLocation;
  }

  async remove(locationId: string): Promise<void> {
    const locationIndex = this.items.findIndex(
      (location) => location.id === locationId,
    );

    this.items.splice(locationIndex, 1);
  }
}
