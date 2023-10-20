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
  public props: Required<UserProps>;

  constructor(props: UserConstructor) {
    this._id = props.id ? props.id : randomUUID();

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      name: props.name.replace(/\s+/g, ' ').trim(),
      email: props.email.replace(/\s+/g, '').trim(),
    };
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  private set email(value: string) {
    this.props.email = value;
  }

  private set password(value: string) {
    this.props.password = value;
  }
}
