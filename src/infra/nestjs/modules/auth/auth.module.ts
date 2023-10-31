import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AdaptersModule } from '../adapters/adapters.module';
import { LocalStrategy } from '../../strategies/local.strategy';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { AuthUserService } from '../../../../applications/services/auth/auth-user/auth-user.service';
import { JwtPort } from '../../../../applications/ports/jwt.port';
import { VerifyTokenService } from '../../../../applications/services/auth/verify-token/verify-token.service';
import { AuthController } from './auth.controller';
import { UserRepositoryInterface } from '../../../../domain/users/user.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AdaptersModule,
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    {
      provide: AuthUserService,
      useFactory: (
        userRepository: UserRepositoryInterface,
        jwtPort: JwtPort,
      ) => {
        return new AuthUserService(userRepository, jwtPort);
      },
      inject: [UserRepositoryInterface, JwtPort],
    },
    {
      provide: VerifyTokenService,
      useFactory: (jwtPort: JwtPort) => {
        return new VerifyTokenService(jwtPort);
      },
      inject: [JwtPort],
    },
  ],
})
export class AuthModule {}
