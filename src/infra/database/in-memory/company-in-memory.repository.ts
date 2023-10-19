import { Company } from 'src/domain/companies/company';
import { CompanyRepositoryInterface } from '../../../domain/companies/company.repository';

const verifyWhere = ({
  where,
  company,
}: {
  where: Partial<Company>;
  company: Company;
}) => {
  if (where?.id && company.id !== where.id) return false;
  if (where?.name && company.name !== where.name) return false;
  if (where?.cnpj && company.cnpj !== where.cnpj) return false;
  if (where?.website && company.website !== where.website) return false;
  if (where?.userId && company.userId !== where.userId) return false;
  return true;
};

export class CompanyInMemoryRepository implements CompanyRepositoryInterface {
  items: Company[] = [];

  async create(company: Company): Promise<Company> {
    this.items.push(company);

    return company;
  }

  async findOne({ where }: { where: Partial<Company> }): Promise<Company> {
    return this.items.find((company) => verifyWhere({ where, company }));
  }

  async findAll({ where }: { where: Partial<Company> }): Promise<Company[]> {
    return this.items.filter((company) => verifyWhere({ where, company }));
  }

  async update(updatedCompany: Company): Promise<void> {
    const companyIndex = this.items.findIndex(
      (company) => company.id === updatedCompany.id,
    );

    this.items[companyIndex] = updatedCompany;
  }

  async remove(companyId: string): Promise<void> {
    const companyIndex = this.items.findIndex(
      (company) => company.id === companyId,
    );

    this.items.splice(companyIndex, 1);
  }
}
