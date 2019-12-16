import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event as EventEntity } from './event.entity';
import { EventInput } from '@calendar/shared/dist';
import { SaveEventError } from '../errors/save-event.error';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY')
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  public async getEvents(filters: any) {
    console.log(filters);
    return this.eventRepository.find();
  }

  // CREATE EVENT

  public async createEvent(eventDTO: EventInput): Promise<EventEntity> {
    const event: EventEntity = this.createEventEntity(eventDTO);
    await event.validate();
    return await this.saveEventEntity(event);
  }

  protected createEventEntity(eventDTO: EventInput): EventEntity {
    try {
      const event: EventEntity = new EventEntity();
      Object.assign(event, eventDTO);
      return event;
    } catch (e) {
      throw e;
    }
  }

  protected async saveEventEntity(
    eventEntity: EventEntity,
  ): Promise<EventEntity> {
    try {
      return await this.eventRepository.save(eventEntity);
    } catch (e) {
      throw new SaveEventError(e);
    }
  }
}
