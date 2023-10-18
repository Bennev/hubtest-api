import { JwtPort } from '../../../ports/jwt.port';

export class AuthUserService {
  constructor(private jwtPort: JwtPort) {}

  async execute(userId: string): Promise<any> {
    const payload = { sub: userId };

    const token = this.jwtPort.create(payload);

    return token;
  }
}
