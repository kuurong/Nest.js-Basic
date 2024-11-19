import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User) // Injecting usersRepository
    private usersRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;

    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      //어떤 이유로 db 연결 실패할경우 statusCode: 408
      throw new RequestTimeoutException('Unable to process', {
        description: 'Error connecting to the DB',
      });
    }

    // Handle exception
    if (existingUser) {
      throw new BadRequestException('이미 유저가 존재해요');

      //statusCode: 400
    }

    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });
    // create 는 db와 interact 하지않아서 exception handling 안해도됨

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      //어떤 이유로 db 연결 실패할경우 statusCode: 408
      throw new RequestTimeoutException('Unable to process', {
        description: 'Error connecting to the DB',
      });
    }

    return newUser;
  }
}
