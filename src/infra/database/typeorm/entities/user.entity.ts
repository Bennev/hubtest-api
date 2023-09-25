import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyTypeOrm } from './company.entity';

@Entity()
export class UserTypeOrm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => CompanyTypeOrm, (company) => company.user)
  companies: CompanyTypeOrm[];

  @CreateDateColumn()
  createdAt: Date;
}
