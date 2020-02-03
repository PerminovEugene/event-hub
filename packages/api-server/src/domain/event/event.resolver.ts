import {
  Event,
  EventInput,
  EventsFiltersInput,
  EventUpdateInput,
} from '@calendar/shared';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { Tag } from '../tag/tag.entity';
import { TagDataLoader } from '../tag/tag.loader';
import { EventService } from './event.service';

@Resolver('Event')
export class EventResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly tagDataLoader: TagDataLoader,
  ) {}

  @Query('events')
  async getEvents(
    @Args('eventFiltersInput')
    eventFiltersInput: EventsFiltersInput,
  ) {
    return await this.eventService.getEvents(eventFiltersInput);
  }

  @Query('event')
  async getEvent(
    @Args('id')
    id: number,
  ) {
    return await this.eventService.getEvent(id);
  }

  @ResolveProperty('tags', () => Tag)
  async tags(@Parent() event: Event): Promise<any> {
    return await this.tagDataLoader.load(event.id);
  }

  @Mutation()
  async createEvent(
    @Args('eventInput')
    event: EventInput,
  ) {
    return await this.eventService.create(event);
  }

  @Mutation()
  async updateEvent(
    @Args('eventUpdateInput')
    event: EventUpdateInput,
  ) {
    return await this.eventService.update(event);
  }
}
