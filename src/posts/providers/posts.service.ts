import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/createPost.dto';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patchPost.dto';

@Injectable()
export class PostsService {
  constructor(
    // Injecting other Services
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async create(createPostDto: CreatePostDto) {
    // find author
    let author = await this.usersService.findOneById(createPostDto.authorId);

    // find tags
    let tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    // Create post
    let post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    return await this.postsRepository.save(post);
  }

  public async findAll(userId: number) {
    const posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
        author: true,
        tags: true, //이 프로퍼티 이름들은 post 엔티티에서 가져온것.
      },
    });
    return posts;
  }

  public async update(patchPostDto: PatchPostDto) {
    // Find the Tags
    let tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    // Find the Post
    let post = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });

    // Update the properties - TypeORM 에서는 spreadOperator 권장X
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    // Update the tags
    post.tags = tags;

    return await this.postsRepository.save(post); //update 할떄도 save 메소드를쓴다.
  }

  public async delete(id: number) {
    // post와 메타옵션 삭제
    await this.postsRepository.delete(id);
    // 결과
    return { deleted: true, id };
  }
}
