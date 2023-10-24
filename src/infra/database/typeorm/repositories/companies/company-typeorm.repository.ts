import { Repository } from 'typeorm';
import { CompanyRepositoryInterface } from '../../../../../domain/companies/company.repository';
import { Company } from '../../../../../domain/companies/company';
import CompanyMapper from './company-typeorm.mapper';
import { CompanyTypeOrm } from '../../entities/company.entity';

export class CompanyTypeOrmRepository implements CompanyRepositoryInterface {
  constructor(private ormRepo: Repository<CompanyTypeOrm>) {}

  async create(company: Company): Promise<Company> {
    const newCompany = CompanyMapper.toTypeOrm(company);

    return CompanyMapper.toLocal(await this.ormRepo.save(newCompany));
  }

  async findOne({ where }: { where: Partial<Company> }): Promise<Company> {
    const newCompany = CompanyMapper.toTypeOrm(where);

    const companyFound = await this.ormRepo.findOne({
      where: newCompany,
      relations: {
        user: true,
      },
    });

    if (!companyFound) return null;

    return CompanyMapper.toLocal(companyFound);
  }

  async findAll({ where }: { where: Partial<Company> }): Promise<Company[]> {
    const companies = await this.ormRepo.find({
      relations: {
        user: true,
      },
    });

    if (where.user) {
      const companiesByUser = companies.filter(
        (company) => company.user.id === where.user.id,
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
