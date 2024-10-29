import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/getUsersParam.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // Injecting usersRepository
    private usersRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService)) // Injecting authService
    private readonly authService: AuthService,

    // Injecting ConfigService
    private readonly configService: ConfigService,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);

    return newUser;
  }

  /**
   * The method to get all the users from the DB
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const envExample = this.configService.get<string>('S3_BUCKET');

    const isAuth = this.authService.isAuth();
    console.log(isAuth);

    //test profileCOnfig
    console.log(this.profileConfiguration); // { apiKey: 'somevalue' }
    console.log(this.profileConfiguration.apiKey); //

    return [
      {
        firstName: 'kurong',
        email: 'kurong@mail.com',
      },
      {
        firstName: 'Suuu',
        email: 'Suuu@mail.com',
      },
    ];
  }

  /**
   * Find a single user using the ID of the user
   */
  public async findOneById(id: number) {
    //async 인 이유? db와 deal 해야하므룽
    return await this.usersRepository.findOneBy({ id });
  }
}
