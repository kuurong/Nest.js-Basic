import { Controller, Body, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaOptionsDto } from './dtos/createPostMetaOptions.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @Post()
  public create(@Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    return this.metaOptionsService.create(createPostMetaOptionsDto);
  }
}
