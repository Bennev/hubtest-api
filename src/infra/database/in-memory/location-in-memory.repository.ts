import { Location } from 'src/domain/locations/location';
import { LocationRepositoryInterface } from '../../../domain/locations/location.repository';

const verifyWhere = ({
  where,
  location,
}: {
  where: Partial<Location>;
  location: Location;
}) => {
  if (where?.id && location.id !== where.id) return false;
  if (where?.name && location.name !== where.name) return false;
  if (where?.cep && location.cep !== where.cep) return false;
  if (where?.street && location.street !== where.street) return false;
  if (where?.number && location.number !== where.number) return false;
  if (where?.neighborhood && location.neighborhood !== where.neighborhood)
    return false;
  if (where?.city && location.city !== where.city) return false;
  if (where?.state && location.state !== where.state) return false;
  if (where?.company && location.company.id !== where.company.id) return false;
  return true;
};

export class LocationInMemoryRepository implements LocationRepositoryInterface {
  items: Location[] = [];

  async create(location: Location): Promise<Location> {
    this.items.push(location);

    return location;
  }

  async findOne({ where }: { where: Partial<Location> }): Promise<Location> {
    return this.items.find((location) => verifyWhere({ where, location }));
  }

  async findAll({ where }: { where: Partial<Location> }): Promise<Location[]> {
    return this.items.filter((location) => verifyWhere({ where, location }));
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
