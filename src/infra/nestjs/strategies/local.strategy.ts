import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { DefaultError } from '../../../applications/errors/default-error';
import { errorMessages } from '../../../applications/errors/error-messages';
import { VerifyPasswordService } from '../../../applications/services/users/verify-password/verify-password.service';
import { UserView } from '../modules/users/user.view';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly verifyPasswordService: VerifyPasswordService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.verifyPasswordService.execute({ email, password });

    if (!user)
      throw new DefaultError(errorMessages.user.invalidEmailOrPassword, 401);

    return UserView.toView(user);
  }
}
