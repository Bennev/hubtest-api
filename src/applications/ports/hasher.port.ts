export abstract class HasherPort {
  abstract hash(value: string): string;
  abstract compare(password: string, hashedPassword: string): boolean;
}
