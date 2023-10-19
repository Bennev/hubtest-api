import { Company } from './company';

export abstract class CompanyRepositoryInterface {
  abstract create(company: Company): Promise<Company>;
  abstract findAll({ where }: { where?: Partial<Company> }): Promise<Company[]>;
  abstract findOne({
    where,
  }: {
    where: Partial<Company>;
  }): Promise<Company | null>;
  abstract update(updatedCompany: Company): Promise<void>;
  abstract remove(companyId: string): Promise<void>;
}
