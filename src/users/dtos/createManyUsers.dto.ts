import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUserDto } from './createUser.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManyUsersDto {
  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      type: 'User',
    },
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true }) //each element of the array would comply to the CreateUserDto.
  @Type(() => CreateUserDto) //the type of value that each element of this particular array would contain.
  users: CreateUserDto[];
}
