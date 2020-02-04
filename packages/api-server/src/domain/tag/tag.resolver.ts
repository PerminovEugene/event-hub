import { TagInput, TagsFiltersInput } from '@calendar/shared';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TagService } from './tag.service';

@Resolver('Tag')
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query('tags')
  async getTags(
    @Args('TagFiltersInput')
    tagFiltersInput: TagsFiltersInput,
  ) {
    return await this.tagService.getTags(tagFiltersInput);
  }

  @Query('tag')
  async getTag(
    @Args('id')
    id: number,
  ) {
    return await this.tagService.getTag(id);
  }

  @Mutation()
  async createTag(
    @Args('tagInput')
    tag: TagInput,
  ) {
    return await this.tagService.create(tag);
  }

  //   @Mutation()
  //   async updateTag(
  //     @Args('tagUpdateInput')
  //     tag: TagUpdateInput,
  //   ) {
  //     return await this.tagService.update(tag);
  //   }
}
