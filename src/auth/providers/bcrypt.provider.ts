import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string): Promise<string> {
    //Generate Salt
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }

  public async comparePassword(
    data: string,
    encrypted: string, //db에 저장된 hash 형태
  ): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
