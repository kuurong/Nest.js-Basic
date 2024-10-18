//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger'; //swagger에 업데이트하고싶으면 여기서 Import하기
import { CreatePostDto } from './createPost.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'The ID of the post that needs to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
