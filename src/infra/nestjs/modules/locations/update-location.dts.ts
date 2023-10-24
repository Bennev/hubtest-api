import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';

export class UpdateLocationDto extends PartialType(
  OmitType(CreateLocationDto, ['companyId']),
) {}
