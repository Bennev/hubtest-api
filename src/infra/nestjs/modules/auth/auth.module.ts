import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AdaptersModule } from '../adapters/adapters.module';
import { LocalStrategy } from '../../strategies/local.strategy';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { AuthUserService } from '../../../../applications/services/auth/auth-user/auth-user.service';
import { JwtPort } from '../../../../applications/ports/jwt.port';
import { VerifyTokenService } from '../../../../applications/services/auth/verify-token/verify-token.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    UsersModule,
    AdaptersModule,
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    {
      provide: AuthUserService,
      useFactory: (jwtPort: JwtPort) => {
        return new AuthUserService(jwtPort);
      },
      inject: [JwtPort],
    },
    {
      provide: VerifyTokenService,
      useFactory: (jwtPort: JwtPort) => {
        return new VerifyTokenService(jwtPort);
      },
      inject: [JwtPort],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
