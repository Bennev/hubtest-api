import { randomUUID } from 'crypto';

export type CompanyProps = {
  name: string;
  website: string;
  cnpj: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

type CompanyConstructor = {
  id?: string;
  name: string;
  website: string;
  cnpj: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Company {
  private readonly _id: string;
  public props: Required<CompanyProps>;

  constructor(props: CompanyConstructor) {
    this._id = props.id ? props.id : randomUUID();

    this.props = {
      ...props,
      name: props.name.replace(/\s+/g, ' ').trim(),
      cnpj: props.cnpj.replace(/[^\d]+/g, ''),
      userId: props.userId ?? null,
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

  get website(): string {
    return this.props.website;
  }

  get cnpj(): string {
    return this.props.cnpj;
  }

  get userId(): string {
    return this.props.userId;
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

  public set website(value: string) {
    this.props.website = value;
  }

  public set cnpj(value: string) {
    this.props.cnpj = value;
  }

  private set userId(value: string) {
    this.props.userId = value;
  }
}
