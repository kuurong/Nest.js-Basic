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

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,
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

    // Send confirmation
    return true;
  }
}
