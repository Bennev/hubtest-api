import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../strategies/jwt-auth.guard';
import { CreateCompanyService } from '../../../../applications/services/companies/create-company/create-company.service';
import { FindOneCompanyService } from '../../../../applications/services/companies/find-one-company/find-one-company.service';
import { FindAllCompaniesService } from '../../../../applications/services/companies/find-all-companies/find-all-companies.service';
import { UpdateCompanyService } from '../../../../applications/services/companies/update-company/update-company.service';
import { RemoveCompanyService } from '../../../../applications/services/companies/remove-company/remove-company.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Company } from '../../../../domain/companies/company';
import { CreateCompanyDto } from './create-company.dto';
import { CompanyView } from './company.view';
import { UpdateCompanyDto } from './update-company.dto';

@UseGuards(JwtAuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly createCompanyService: CreateCompanyService,
    private readonly findOneCompanyService: FindOneCompanyService,
    private readonly findAllCompaniesService: FindAllCompaniesService,
    private readonly updateCompanyService: UpdateCompanyService,
    private readonly removeCompanyService: RemoveCompanyService,
  ) {}

  @ApiCreatedResponse({
    description: 'Company created',
  })
  @ApiBadRequestResponse({
    description: 'Some field has incorrect or missing data',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid bearer token JWT',
  })
  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<CompanyView> {
    const company = await this.createCompanyService.execute(createCompanyDto);
    return CompanyView.toView(company);
  }

  @ApiOkResponse({
    description: 'Companies list by user',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid bearer token JWT',
  })
  @Get()
  async findAll(@Body() where: Partial<Company>): Promise<CompanyView[]> {
    const companies = await this.findAllCompaniesService.execute({ where });
    return companies.map((company) => CompanyView.toView(company));
  }

  @ApiOkResponse({
    description: 'Specific company information',
  })
  @ApiBadRequestResponse({
    description: 'Company not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid bearer token JWT',
  })
  @Get(':companyId')
  async findOne(@Param('companyId') companyId: string) {
    const company = await this.findOneCompanyService.execute(companyId);
    return CompanyView.toView(company);
  }

  @ApiOkResponse({
    description: 'Successfully updated company',
  })
  @ApiBadRequestResponse({
    description: 'Company not found or some field has incorrect data',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid bearer token JWT',
  })
  @Put(':companyId')
  async update(
    @Param('companyId') companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const company = await this.updateCompanyService.execute(
      updateCompanyDto,
      companyId,
    );
    return CompanyView.toView(company);
  }

  @ApiOkResponse({
    description: 'Successfully removed company',
  })
  @ApiBadRequestResponse({
    description: 'Company not found or some field has incorrect data',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid bearer token JWT',
  })
  @Delete(':companyId')
  async remove(@Param('companyId') companyId: string) {
    await this.removeCompanyService.execute(companyId);
  }
}
