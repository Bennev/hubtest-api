import { randomUUID } from 'crypto';
import { User } from '../users/user';

export type CompanyProps = {
  name: string;
  website: string;
  cnpj: string;
  user: User | null;
  createdAt: Date;
  updatedAt: Date;
};

type CompanyConstructor = {
  id?: string;
  name: string;
  website: string;
  cnpj: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Company {
  private readonly _id: string;
  private _name: string;
  private _website: string;
  private _cnpj: string;
  private _user: User | null;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: CompanyConstructor) {
    this._id = props.id ? props.id : randomUUID();
    this._name = props.name;
    this._website = props.website;
    this._cnpj = props.cnpj;
    this._user = props.user ?? null;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get website(): string {
    return this._website;
  }

  get cnpj(): string {
    return this._cnpj;
  }

  get user(): User {
    return this._user;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set name(value: string) {
    this._name = value.replace(/\s+/g, ' ').trim();
  }

  set website(value: string) {
    this._website = value;
  }

  set cnpj(value: string) {
    this._cnpj = value.replace(/[^\d]+/g, '');
  }

  set user(value: User) {
    this._user = value;
  }
}
