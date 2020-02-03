import { TagInput, TagsFiltersInput } from '@calendar/shared';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { TagLoader } from './tag.loader';
import { TagService } from './tag.service';
import DataLoader = require('dataloader');

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

  //
  // @Resolver('tags')
  // @Query(() => [Tag], { description: 'returns list of tags throgh dataloader' })
  // public tags(
  //   @Args({ name: 'ids', type: () => [String] }) ids,
  //   @Loader(TagLoader.name)
  //   tagLoader: DataLoader<Tag['id'], Tag>,
  // ): Promise<(Tag | Error)[]> {
  //   return tagLoader.loadMany(ids);
  // }
  //

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
