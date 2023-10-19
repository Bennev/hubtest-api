import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthUserService } from '../../../../applications/services/auth/auth-user/auth-user.service';
import { VerifyTokenService } from '../../../../applications/services/auth/verify-token/verify-token.service';
import { AuthDto } from './auth.dto';
import { VerifyPasswordService } from '../../../../applications/services/users/verify-password/verify-password.service';
import { LocalAuthGuard } from '../../strategies/local-auth.guard';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUserService: AuthUserService,
    private readonly verifyTokenService: VerifyTokenService,
    private readonly verifyPasswordService: VerifyPasswordService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    description: 'User successfully authenticated',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid bearer token JWT',
  })
  @Post()
  async signIn(@Body() authDto: AuthDto) {
    const user = await this.verifyPasswordService.execute(authDto);
    const token = await this.authUserService.execute(user.id);
    return token;
  }

  @ApiOkResponse({
    description: 'Valid token',
  })
  @ApiUnauthorizedResponse({
    description: 'Expired or invalid token',
  })
  @Get()
  async verifyToken(@Param('token') token: string) {
    await this.verifyTokenService.execute(token);
  }
}
