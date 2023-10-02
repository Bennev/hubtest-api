import { randomUUID } from 'crypto';

export type LocationProps = {
  name: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
};

type LocationConstructor = {
  id?: string;
  name: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  companyId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Location {
  private readonly _id: string;
  public props: Required<LocationProps>;

  constructor(props: LocationConstructor) {
    this._id = props.id ? props.id : randomUUID();

    this.props = {
      ...props,
      name: props.name.replace(/\s+/g, ' ').trim(),
      cep: props.cep.replace(/\s+/g, ' ').trim(),
      street: props.street.replace(/\s+/g, ' ').trim(),
      number: props.number.replace(/\s+/g, ' ').trim(),
      neighborhood: props.neighborhood.replace(/\s+/g, ' ').trim(),
      city: props.city.replace(/\s+/g, ' ').trim(),
      state: props.state.replace(/\s+/g, ' ').trim(),
      companyId: props.companyId ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get cep(): string {
    return this.props.cep;
  }

  get street(): string {
    return this.props.street;
  }

  get number(): string {
    return this.props.number;
  }

  get neighborhood(): string {
    return this.props.neighborhood;
  }

  get city(): string {
    return this.props.city;
  }

  get state(): string {
    return this.props.state;
  }

  get companyId(): string {
    return this.props.companyId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public set name(value: string) {
    this.props.name = value;
  }

  public set cep(value: string) {
    this.props.cep = value;
  }

  public set street(value: string) {
    this.props.street = value;
  }

  public set number(value: string) {
    this.props.number = value;
  }

  public set neighborhood(value: string) {
    this.props.neighborhood = value;
  }

  public set city(value: string) {
    this.props.city = value;
  }

  public set state(value: string) {
    this.props.state = value;
  }

  public set companyId(value: string) {
    this.props.companyId = value;
  }
}
