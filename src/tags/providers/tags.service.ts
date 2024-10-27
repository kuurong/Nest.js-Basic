import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/createTag.dto';

@Injectable()
export class TagsService {
  constructor(
    // Inject tagsRepo
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    let tag = this.tagsRepository.create(createTagDto);
    return await this.tagsRepository.save(tag);
  }

  public async findMultipleTags(tags: number[]) {
    let results = await this.tagsRepository.find({
      where: {
        id: In(tags), // tags = [1,2,4] 이면 id 가 1,2,4 인 태그들을 다 찾아준다.
      },
    });

    return results;
  }

  public async delete(id: number) {
    await this.tagsRepository.delete(id);

    return {
      deleted: true,
      id,
    };
  }

  public async softDelete(id: number) {
    await this.tagsRepository.softDelete(id);

    return {
      deleted: true,
      id,
    };
  }

  public async findAll() {
    const tags = await this.tagsRepository.find({
      relations: {
        posts: true,
      },
    });
    return tags;
  }
}
