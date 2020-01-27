import {
  EventInput,
  EventsFiltersInput,
  EventUpdateInput,
} from '@calendar/shared';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventService } from './event.service';

@Resolver('Event')
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

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
