import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-type.enum'; // Bearer , None
import { AUTH_TYPE_KEY } from '../constants/auth.constants'; // 'authType'

// Auth is a decorator which takes in only two types of arguments
// auth can either be bearer or it can be none

export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);

// 기본형 export const Auth = (...args: string[]) => SetMetadata('auth', args);
