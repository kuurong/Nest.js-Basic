import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    // Injecting usersService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public login(email: string, password: string, id: string) {
    // check user exists in DB (usersService)
    //const user = this.usersService.findOneById('1234');
    // login
    // token
    return 'TOKEN';
  }

  public isAuth() {
    return true;
  }
}
