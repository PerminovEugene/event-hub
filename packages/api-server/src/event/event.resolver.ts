import { EventInput } from '@calendar/shared';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventService } from './event.service';

@Resolver('Event')
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query('events')
  async getEvents(
    @Args('eventFiltersInput')
    filtersInput: any,
  ) {
    return await this.eventService.getEvents(filtersInput);
  }

  @Mutation()
  async createEvent(
    @Args('eventInput')
    event: EventInput,
  ) {
    return await this.eventService.create(event);
  }
}
