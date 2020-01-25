import { EventInput } from '@calendar/shared';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SaveEventError } from '../errors/save-event.error';
import { Event as EventEntity } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY')
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  public async getEvents(filters: any) {
    return this.eventRepository.find();
  }

  // CREATE EVENT

  public async create(eventDTO: EventInput): Promise<EventEntity> {
    const event: EventEntity = this.createEventEntity(eventDTO);
    await event.validate();
    return await this.saveEventEntity(event);
  }

  protected createEventEntity(eventDTO: EventInput): EventEntity {
    try {
      const event: EventEntity = new EventEntity();
      // TODO tricky
      Object.assign(event, eventDTO, { date: new Date(eventDTO.date) });

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
