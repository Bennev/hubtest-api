import { errorMessages } from '../../../errors/error-messages';
import { DefaultError } from '../../../errors/default-error';
import { JwtPort } from '../../../ports/jwt.port';

export class VerifyTokenService {
  constructor(private jwtPort: JwtPort) {}

  async execute(token: string): Promise<void> {
    const isValid = this.jwtPort.validate(token);
    if (!isValid) throw new DefaultError(errorMessages.user.expiredToken, 401);
  }
}
