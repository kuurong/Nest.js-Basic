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
    // Create post
    let post = this.postsRepository.create(createPostDto);
    console.log('hihi');
    return await this.postsRepository.save(post);
  }

  public async findAll(userId: string) {
    // Users Service 필요
    // Find A User
    const user = this.usersService.findOneById(userId);

    const posts = await this.postsRepository.find();
    return posts;
  }

  public async delete(id: number) {
    // 삭제할 post 찾기
    let post = await this.postsRepository.findOneBy({ id }); // id:id 생략가능
    // post 삭제
    await this.postsRepository.delete(id);
    // meta_options 삭제
    await this.metaOptionsRepository.delete(post.metaOptions.id);
    // 결과
    return { deleted: true, id };
  }
}
