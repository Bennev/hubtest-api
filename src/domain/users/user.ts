import { randomUUID } from 'crypto';

export type UserProps = {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
};

type UserConstructor = {
  id?: string;
  email: string;
  name: string;
  password: string;
  createdAt?: Date;
};

export class User {
  private readonly _id: string;
  private _email: string;
  private _name: string;
  private _password: string;
  private _createdAt: Date;

  constructor(props: UserConstructor) {
    this._id = props.id ? props.id : randomUUID();
    this._email = props.email.replace(/\s+/g, '').trim();
    this._name = props.name.replace(/\s+/g, ' ').trim();
    this._password = props.password;
    this._createdAt = props.createdAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set name(value: string) {
    this._name = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set password(value: string) {
    this._password = value;
  }
}
