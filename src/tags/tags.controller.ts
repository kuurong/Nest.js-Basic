import {
  Body,
  Controller,
  Post,
  Delete,
  Query,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/createTag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Delete()
  public deleteTag(@Query('id', ParseIntPipe) id: number) {
    //query는 string이므로 ParseIntPipe 로 query string으로 불려온걸 number로 바꿔줌
    return this.tagsService.delete(id);
  }

  @Delete('soft-delete')
  public softDelete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softDelete(id);
  }

  @Get() // GET posts/:userId
  public getPosts() {
    return this.tagsService.findAll();
  }
}
