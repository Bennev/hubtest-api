import { JwtPort } from './jwt.port';

export class MockJwtPort implements JwtPort {
  create(payload: any): string {
    return payload;
  }

  validate(token: string): boolean {
    return !!token;
  }
}
