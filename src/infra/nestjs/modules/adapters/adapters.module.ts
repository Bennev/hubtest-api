import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HasherPort } from 'src/applications/ports/hasher.port';
import { JwtPort } from 'src/applications/ports/jwt.port';
import { BcryptAdapter } from 'src/infra/adapters/bcrypt.adapter';
import { JwtAdapter } from 'src/infra/adapters/jwt.adapter';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: HasherPort,
      useFactory: () => {
        return new BcryptAdapter();
      },
    },
    {
      provide: JwtPort,
      useFactory: () => {
        return new JwtAdapter(process.env.JWT_SECRET_KEY);
      },
    },
  ],
  exports: [JwtPort, HasherPort],
})
export class AdaptersModule {}
