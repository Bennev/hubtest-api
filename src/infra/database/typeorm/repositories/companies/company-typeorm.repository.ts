import { Repository } from 'typeorm';
import { CompanyRepositoryInterface } from '../../../../../domain/companies/company.repository';
import { Company } from '../../../../../domain/companies/company';
import CompanyMapper from './company-typeorm.mapper';

export class CompanyTypeOrmRepository implements CompanyRepositoryInterface {
  constructor(private ormRepo: Repository<Company>) {}

  async create(company: Company): Promise<Company> {
    const newCompany = CompanyMapper.toTypeOrm(company);

    return CompanyMapper.toLocal(await this.ormRepo.save(newCompany));
  }

  //ERROR
  async findOne({ where }: { where: Partial<Company> }): Promise<Company> {
    const newCompany = CompanyMapper.toTypeOrm(where);

    const companyFound = await this.ormRepo.findOne({ where: newCompany });

    if (!companyFound) return null;
    return CompanyMapper.toLocal(companyFound);
  }

  //ERROR
  async findAll({ where }: { where: Partial<Company> }): Promise<Company[]> {
    const companies = await this.ormRepo.find();
    if (where.userId) {
      const companiesByUser = companies.filter(
        (company) => company.userId === where.userId,
      );
      return companiesByUser.map((company) => CompanyMapper.toLocal(company));
    }

    return companies.map((company) => CompanyMapper.toLocal(company));
  }

  async update(updatedCompany: Company): Promise<void> {
    const company = CompanyMapper.toTypeOrm(updatedCompany);
    await this.ormRepo
      .createQueryBuilder()
      .update(company)
      .set({
        ...company,
      })
      .where('id = :id', { id: company.id })
      .execute();
  }

  async remove(companyId: string): Promise<void> {
    await this.ormRepo.delete(companyId);
  }
}
