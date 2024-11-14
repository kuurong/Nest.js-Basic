import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUser.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/createManyUsers.dto';
@Injectable()
export class UsersCreateManyProvider {
  constructor(
    // Injecting Datasource
    private readonly dataSource: DataSource,
  ) {}

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    let newUsers: User[] = [];
    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      //only two lines of code that interact with the database are inside the try block
      // Connect Query Runner to datasource
      await queryRunner.connect();

      // Start Transactions
      await queryRunner.startTransaction();
    } catch (err) {
      throw new RequestTimeoutException('connection to DB failed');
    }

    try {
      for (let user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser); //한 user db 저장
        newUsers.push(result);
      }

      // 성공적으로 commit
      // with this line of code, we have successfully catered to the success condition.
      await queryRunner.commitTransaction();
    } catch (err) {
      // 하나라도 실패면 rollback
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Transations didnt complete', {
        description: String(err),
      });
    } finally {
      try {
        // 성공이든 실패든 이제 DB연결해제
        await queryRunner.release();
      } catch (err) {
        throw new RequestTimeoutException('Could not release the conenction', {
          description: String(err),
        });
      }
    }

    return newUsers;
  }
}
