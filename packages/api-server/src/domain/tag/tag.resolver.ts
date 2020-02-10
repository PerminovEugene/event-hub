import { Action, Resource, TagInput, TagsFiltersInput } from '@event-hub/shared';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Permission } from '../..//decorators/resolvers/roles.decorator';
import { GqlAuthenticationGuard } from '../auth/guards/gql.authentification.guard';
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
  @Permission(Resource.tag, Action.update)
  @UseGuards(GqlAuthenticationGuard)
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
