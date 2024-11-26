import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  // static property, we can use the property by its name itself instead of accessing it using the 'this' keyword.
  // 🌟default는 Bearer이다 - 대부분의 모든 라우트를 bearer token을 사용해야하는 protected 하기위해🌟
  private static readonly defaultAuthType = AuthType.Bearer;

  // this object is going to contain guards for each of the authentication types that is available.
  // Create authTypeGuardMap
  // ㅇㅣ게 뭔소리누
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //console.log(this.authTypeGuardMap, 'authTypeGuardMap');
    //console.log('hii');

    // auth types can be grabbed from the reflector.
    // return an array of all the auth types that have been implemented or assigned to a specific handler of the class or to the class itself.
    const authTypes = this.reflector.getAllAndOverride(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
      // getHandler- getting all the meta values which have this AUTH_TYPE_KEY
      //먼소리노..
    ) ?? [AuthenticationGuard.defaultAuthType];
    //console.log(authTypes, 'authTypes'); //  @Auth(AuthType.None)  이면 [1] ===  None authTypeGuardMap에서 두번째(인덱스 1)이 None임

    // array of guards - contain guards for each of the auth types.
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    //console.log(guards, 'guards');

    // Loop guards canActivate -  fire the can activate method.
    for (const instance of guards) {
      console.log(instance, 'instance');
      //instance.hello();

      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        err;
      });
      console.log(canActivate, 'canActivate');
      if (canActivate) {
        return true;
      }
    }

    // default error - whenever a user is not authorized to access a specific endpoint.
    const error = new UnauthorizedException();

    throw error;
  }
}
