import { randomUUID } from 'crypto';
import { Company } from '../companies/company';

export type LocationProps = {
  name: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  company: Company | null;
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
  company?: Company;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Location {
  private readonly _id: string;
  private _name: string;
  private _cep: string;
  private _street: string;
  private _number: string;
  private _neighborhood: string;
  private _city: string;
  private _state: string;
  private _company: Company | null;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: LocationConstructor) {
    this._id = props.id ? props.id : randomUUID();
    this._name = props.name.replace(/\s+/g, ' ').trim();
    this._cep = props.cep.replace(/\s+/g, ' ').trim();
    this._street = props.street.replace(/\s+/g, ' ').trim();
    this._number = props.number.replace(/\s+/g, ' ').trim();
    this._neighborhood = props.neighborhood.replace(/\s+/g, ' ').trim();
    this._city = props.city.replace(/\s+/g, ' ').trim();
    this._state = props.state.replace(/\s+/g, ' ').trim();
    this._company = props.company ?? null;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get cep(): string {
    return this._cep;
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get neighborhood(): string {
    return this._neighborhood;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get company(): Company {
    return this._company;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set name(value: string) {
    this._name = value;
  }

  set cep(value: string) {
    this._cep = value;
  }

  set street(value: string) {
    this._street = value;
  }

  set number(value: string) {
    this._number = value;
  }

  set neighborhood(value: string) {
    this._neighborhood = value;
  }

  set city(value: string) {
    this._city = value;
  }

  set state(value: string) {
    this._state = value;
  }

  set company(value: Company) {
    this._company = value;
  }
}
