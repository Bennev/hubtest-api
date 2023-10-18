import { JwtService } from '@nestjs/jwt';
import { JwtPort } from 'src/applications/ports/jwt.port';

export class JwtAdapter implements JwtPort {
  private readonly jwtService: JwtService;

  constructor(secret: string) {
    this.jwtService = new JwtService({
      secret,
      signOptions: {
        expiresIn: '1h',
      },
    });
  }

  create(payload: any): string {
    const token = this.jwtService.sign(payload);
    return token;
  }

  validate(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
