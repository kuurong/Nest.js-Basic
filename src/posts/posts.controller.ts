import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/createPost.dto';
import { PatchPostDto } from './dtos/patchPost.dto';

@Controller('posts')
@ApiTags('Posts API')
export class PostsController {
  constructor(
    // Injecting Posts Service
    private readonly postsService: PostsService,
  ) {}

  @Get('/:userId?') // GET posts/:userId
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
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
    console.log(patchPostDto);
  }
}
