import { CreateUserDto } from './createUser.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PatchUserDto extends PartialType(CreateUserDto) {
  // CreateUserDto의 모든 프로퍼티들이 optional 로 된다
  // validation 모두 상속됨
}
