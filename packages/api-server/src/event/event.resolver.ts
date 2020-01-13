import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventService } from './event.service';
import { EventInput } from '@calendar/shared';

@Resolver('Event')
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query()
  async getEvents(
    @Args('FiltersInput')
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
