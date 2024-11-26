import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { Request } from 'express';

import jwtConfig from 'src/auth/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  // validate token -> JWT service 필요,  JWT configuration는  JWT service에서 필요함
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY) //밑 코드 ConfigType와 세트임
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(
    //Within this method itself, we can validate the JSON web token.
    context: ExecutionContext, // 이 context를 통해 Extract the request
  ): Promise<boolean> {
    // extract token from the request and validate it

    // 1. Extract the request from the execution context
    const request = context.switchToHttp().getRequest();
    //switchToHttp - this gives you the access to the HTTP request.
    //getRequest - to grab the request body from the HTTP request and give us access to the incoming request.

    // 2. Extract the token from header
    const token = this.extractRequestFromHeader(request);

    // 3. Validate the token
    // token이 만약 undefiend? => authorized되지않음
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // whenever you use verify async method on JWT service and if the token is valid,
      // the JWT service returns the payload to you.
      // Based on the payload, We can identify the user. 왜냐면 payload에 db id값 등 존재하니까
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      //Add this payload to my request body.
      //request['user'] = payload;
      request[REQUEST_USER_KEY] = payload;
      //whenever you want to access this payload in any controller, you would grab the request and use the user key  to get the details of the user.
      console.log(request, 'request');
      console.log(payload, 'payload');
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  //private method because we'll be using this method only inside this class
  private extractRequestFromHeader(request: Request): string | undefined {
    // console.log(request, 'request in extractRequestFromHeader');
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    // 우리가 필요한건 두번쨰 토큰. 첫번째는 bearer
    // []일 경우 token 은 undefiend, 즉 authorized되지않음

    return token;
  }

  public hello() {
    console.log('hellppp');
  }
}

// {
//   sub: 4,
//   email: 'hashh@mail.com',
//   iat: 1732523004,
//   exp: 1732526604,
//   aud: 'localhost:3000',
//   iss: 'localhost:3000'
// } payload
