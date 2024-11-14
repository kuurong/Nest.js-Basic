import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/createPost.dto';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patchPost.dto';
import { GetPostsDto } from '../dtos/getPosts.dto';

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

  public async findAll(postQuery: GetPostsDto, userId: string) {
    const posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
        //author: true,
        //tags: true, //이 프로퍼티 이름들은 post 엔티티에서 가져온것.
      },

      skip: (postQuery.page - 1) * postQuery.limit, //몇개 스킵할건지
      take: postQuery.limit, //몇개 데이타 보여줄건지
    });
    return posts;
  }

  public async update(patchPostDto: PatchPostDto) {
    let tags = undefined;
    let post = undefined;
    // Find the Tags
    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException('db 연동 오류');
    }

    // Number of tags need to be equal (exeption handling)
    // what if no tags were found
    // db에 없는 tag + 있는 tag 일시
    if (!tags || tags.length! == patchPostDto.tags.length) {
      throw new BadRequestException(
        'tags id를 다시 체크하고 유효한 id인지 확인해주세요',
      );
    }

    // Find the Post
    try {
      post = await this.postsRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException('db 연동 오류');
    }

    if (!post) {
      throw new BadRequestException('post id가 존재하지않아요');
    }

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

    try {
      await this.postsRepository.save(post); //update 할떄도 save 메소드를쓴다.
    } catch (error) {
      throw new RequestTimeoutException('db 연동 오류');
    }

    return post;
  }

  public async delete(id: number) {
    // post와 메타옵션 삭제
    await this.postsRepository.delete(id);
    // 결과
    return { deleted: true, id };
  }
}
