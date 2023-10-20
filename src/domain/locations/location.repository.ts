import { Location } from './location';

export abstract class LocationRepositoryInterface {
  abstract create(location: Location): Promise<Location>;
  abstract findAll({
    where,
  }: {
    where?: Partial<Location>;
  }): Promise<Location[]>;
  abstract findOne({
    where,
  }: {
    where: Partial<Location>;
  }): Promise<Location | null>;
  abstract update(updatedLocation: Location): Promise<void>;
  abstract remove(locationId: string): Promise<void>;
}
