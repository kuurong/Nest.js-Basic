import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUser.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
@Injectable()
export class UsersCreateManyProvider {
  constructor(
    // Injecting Datasource
    private readonly dataSource: DataSource,
  ) {}

  public async createMany(createUsersDtos: CreateUserDto[]) {
    let newUsers: User[] = [];
    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    // Connect Query Runner to datasource
    await queryRunner.connect();

    // Start Transactions
    await queryRunner.startTransaction();
    try {
      for (let user of createUsersDtos) {
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
    } finally {
      // 성공이든 실패든 이제 DB연결해제
      await queryRunner.release();
    }

    return newUsers;
  }
}
