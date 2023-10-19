import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDtoInterface } from 'src/applications/services/users/create-user/create-user.dto';

export class CreateUserDto implements CreateUserDtoInterface {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  email: string;

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
  password: string;
}
