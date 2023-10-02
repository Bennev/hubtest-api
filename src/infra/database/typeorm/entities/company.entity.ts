import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserTypeOrm } from './user.entity';
import { LocationTypeOrm } from './location.entity';

@Entity()
export class CompanyTypeOrm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  website: string;

  @Column()
  cnpj: string;

  @ManyToOne(() => UserTypeOrm, (user) => user.companies)
  user: UserTypeOrm;

  @OneToMany(() => LocationTypeOrm, (location) => location.company)
  locations: LocationTypeOrm[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
