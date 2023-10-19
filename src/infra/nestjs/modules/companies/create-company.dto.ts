import { ApiProperty } from '@nestjs/swagger';
import { CreateCompanyDtoInterface } from '../../../../applications/services/companies/create-company/create-company.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto implements CreateCompanyDtoInterface {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  website: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  userId: string;
}
