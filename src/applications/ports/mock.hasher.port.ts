import { HasherPort } from './hasher.port';

export class MockHasher implements HasherPort {
  hash(value: string): string {
    return value;
  }

  compare(password: string, hashedPassword: string) {
    return password === hashedPassword;
  }
}
