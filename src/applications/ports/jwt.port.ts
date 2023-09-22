export abstract class JwtPort {
  abstract create(payload: any): string;
  abstract validate(token: string): boolean;
}
