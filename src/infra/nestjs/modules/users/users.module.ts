import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { AdaptersModule } from '../adapters/adapters.module';
import { JwtAuthGuard } from '../../strategies/jwt-auth.guard';
import { CreateUserService } from 'src/applications/services/users/create-user/create-user.service';
import { UserRepositoryInterface } from 'src/domain/users/user.repository';
import { HasherPort } from 'src/applications/ports/hasher.port';
import { VerifyPasswordService } from 'src/applications/services/users/verify-password/verify-password.service';
import { FindOneUserService } from 'src/applications/services/users/find-one-user/find-one-user.service';
import { FindAllUsersService } from 'src/applications/services/users/find-all-users/find-all-users.service';

@Module({
  imports: [DatabaseModule, AdaptersModule],
  controllers: [UsersController],
  providers: [
    JwtAuthGuard,
    {
      provide: CreateUserService,
      useFactory: (
        userRepository: UserRepositoryInterface,
        hashPort: HasherPort,
      ) => {
        return new CreateUserService(userRepository, hashPort);
      },
      inject: [UserRepositoryInterface, HasherPort],
    },
    {
      provide: FindAllUsersService,
      useFactory: (usersRepository: UserRepositoryInterface) => {
        return new FindAllUsersService(usersRepository);
      },
      inject: [UserRepositoryInterface],
    },
    {
      provide: FindOneUserService,
      useFactory: (usersRepository: UserRepositoryInterface) => {
        return new FindOneUserService(usersRepository);
      },
      inject: [UserRepositoryInterface],
    },
    {
      provide: VerifyPasswordService,
      useFactory: (
        userRepository: UserRepositoryInterface,
        hashPort: HasherPort,
      ) => {
        return new VerifyPasswordService(userRepository, hashPort);
      },
      inject: [UserRepositoryInterface, HasherPort],
    },
  ],
  exports: [VerifyPasswordService],
})
export class UsersModule {}
