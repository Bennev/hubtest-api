import { HasherPort } from 'src/applications/ports/hasher.port';
import { compare as useCompare, hash } from 'bcrypt';

export class BcryptAdapter implements HasherPort {
  hash(value: string): string {
    const hashedValue = hash(value, 8);
    return hashedValue;
  }

  compare(password: string, hashedPassword: string): boolean {
    return useCompare(password, hashedPassword);
  }
}
