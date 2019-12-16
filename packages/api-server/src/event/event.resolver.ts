import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventService } from './event.service';
import { EventInput } from '@calendar/shared';

@Resolver('Event')
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query()
  async getEvents(
    @Args('filters')
    filters: any,
  ) {
    return await this.eventService.getEvents(filters);
  }

  @Mutation()
  async createEvent(
    @Args('event')
    event: EventInput,
  ) {
    return await this.eventService.createEvent(event);
  }
}
