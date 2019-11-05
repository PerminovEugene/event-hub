import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { EventService } from './event.service';
import { EventInput } from '../graphql';
import { AppError } from '../errors/app.error';
import { handleError } from '../errors/helper';

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
    try {
      return await this.eventService.createEvent(event);
    } catch (e) {
      handleError(e);
    }
  }
}
