import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/createPost.dto';
import { PatchPostDto } from './dtos/patchPost.dto';
import { GetPostsDto } from './dtos/getPosts.dto';
// import { Auth } from 'src/auth/decorators/auth.decorator';
// import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('posts')
@ApiTags('Posts API')
export class PostsController {
  constructor(
    // Injecting Posts Service
    private readonly postsService: PostsService,
  ) {}

  @Get('/:userId?') // GET posts/:userId
  public getPosts(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostsDto,
  ) {
    console.log(postQuery, 'postQuery');
    return this.postsService.findAll(postQuery, userId);
  }

  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'success!',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({
    summary: 'Updates a blog post already existign',
  })
  @ApiResponse({
    status: 200,
    description: 'success!',
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    //query는 string이므로 ParseIntPipe 로 query string으로 불려온걸 number로 바꿔줌
    return this.postsService.delete(id);
  }
}
