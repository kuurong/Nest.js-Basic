import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/createPost.dto';

@Injectable()
export class PostsService {
  constructor(
    // Injecting Users Service
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(createPostDto: CreatePostDto) {
    //Create metaOptions
    let metaOptions = createPostDto.metaOptions
      ? this.metaOptionsRepository.create(createPostDto.metaOptions)
      : null;

    if (metaOptions) {
      await this.metaOptionsRepository.save(metaOptions);
    }

    // Create post
    let post = this.postsRepository.create(createPostDto);

    // Add metaOptions to the post
    if (metaOptions) {
      post.metaOptions = metaOptions;
    }

    return await this.postsRepository.save(post);
  }

  public findAll(userId: string) {
    // Users Service 필요
    // Find A User
    const user = this.usersService.findOneById(userId);
    return [
      {
        user: user,
        title: 'kurong',
        content: '크롱이 사랑해',
      },
      {
        user: user,
        title: '안녕',
        content: '안녀러럴럴ㅇ',
      },
    ];
  }
}
