import {
  Injectable,
  Inject,
  forwardRef,
  RequestTimeoutException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/getUsersParam.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/createManyUsers.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';

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

    // Injecting Datasource
    private readonly dataSource: DataSource,

    // Injecting UsersCreateManyProvider
    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    // Injecting createUserProvider
    private readonly createUserProvider: CreateUserProvider,

    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return await this.createUserProvider.createUser(createUserDto);
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
    let user = undefined;

    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process', {
        description: 'Error connecting to the DB',
      });
    }

    if (!user) {
      throw new BadRequestException('유저가 존재하지않아요');
    }

    return user;
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }

  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }

  public async test() {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The API endpoint does not exist',
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        description: 'Occured cuz the endpoint was permanently moved',
      },
    );
  }
}
