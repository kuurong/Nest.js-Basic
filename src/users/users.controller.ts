import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Patch,
  Headers,
  Ip,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { GetUsersParamDto } from './dtos/getUsersParam.dto';
import { PatchUserDto } from './dtos/patchUser.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

// localhost:3000/users
@Controller('users')
@ApiTags('Users API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Final endpoint - /users/id?limit=10&page=1 //id는 파라미터, ?뒤는 쿼리
  // param id - optional, int로 바껴야함, default value 없음
  // query limit - int, default value 10
  // query page - int, default value 1
  // /users?limit=10&page=2 -> return page 2 with limt of pagination 10

  @Get('/:id?')
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'limit query desc',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'page query desc',
    example: 10,
  })
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUsersParamDto, limit, page);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    //usersService 코드 안에 이미 async createUser 이기 때문에 여기서 async 안해도된다
    return this.usersService.createUser(createUserDto);
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}

// export class UsersController {
//   @Get('/:id/:opt?')
//   public getUsers(@Param('id') id: string, @Query('age') age: any) {
//     console.log(id, 'id');
//     // @Param() params: any
//     // { id: 'kurong' } params
//     // { id: 'kurong', opt: 'oopt' }
//     // { id: 'kurong', opt: undefined }
//     console.log(age, 'age');
//     // { name: 'su', age: '20' } query
//     return 'Get Users 요청 성공';
//   }

//   @Post()
//   public createUser(@Body('이메일') email: string) {
//     //@Body() body: any
//     //console.log(body, 'body');
//     // { '성': '정', '이름': '크롱', '이메일': 'kurong@mail.com' } body
//     console.log(email);
//     return 'Post createUser 요청 성공';
//   }
// }
