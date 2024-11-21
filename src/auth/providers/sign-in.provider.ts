import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,

    private readonly jwtService: JwtService, // To use this service, we need the configuration

    @Inject(jwtConfig.KEY) //ConfigType 쓰려면 무조건 Inject해야한다.
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>, //this ensures that JWT configuration is injected into our class.
  ) {}

  public async signIn(singInDto: SignInDto) {
    // check user exists in DB (usersService) by email
    // throw exception if user not found
    let user = await this.usersService.findOneByEmail(singInDto.email);

    let isEqual: boolean = false;
    // compare pw to the hash
    try {
      isEqual = await this.hashingProvider.comparePassword(
        singInDto.password,
        user.password,
      );
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: 'Could not compare the password',
      });
    }
    // confirmation (token)
    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    // return a JSON web token(JWT)
    const accessToken = await this.jwtService.signAsync(
      // signAsync => Generate access token
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    // Return Access token
    return {
      accessToken,
    };
  }
}
