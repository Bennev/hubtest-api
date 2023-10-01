import { Company } from 'src/domain/companies/company';
import { CompanyRepositoryInterface } from '../../../domain/companies/company.repository';

export class CompanyInMemoryRepository implements CompanyRepositoryInterface {
  items: Company[] = [];

  async create(company: Company): Promise<Company> {
    this.items.push(company);

    return company;
  }

  async findOne({ where }: { where: Partial<Company> }): Promise<Company> {
    const foundCompany = this.items.find((company) => company.id === where.id);
    return foundCompany;
  }

  async findAll({ where }: { where: Partial<Company> }): Promise<Company[]> {
    if (where.userId) {
      return this.items.filter((company) => company.userId === where.userId);
    }

    return this.items;
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
