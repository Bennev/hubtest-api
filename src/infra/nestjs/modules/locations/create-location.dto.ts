import { ApiProperty } from '@nestjs/swagger';
import { CreateLocationDtoInterface } from '../../../../applications/services/locations/create-location/create-location.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateLocationDto implements CreateLocationDtoInterface {
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
  cep: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  companyId: string;
}
