import {
  EventInput,
  EventsFiltersInput,
  EventUpdateInput,
} from '@calendar/shared';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SaveEventError } from '../../errors/save-event.error';
import { Event as EventEntity } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY')
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  public async getEvents(filters?: EventsFiltersInput) {
    return this.eventRepository.find();
  }

  public async getEvent(id: number) {
    return this.eventRepository.findOne(id);
  }

  public async create(eventDTO: EventInput): Promise<EventEntity> {
    const event: EventEntity = this.createEventEntity(eventDTO);
    await event.validate();
    return await this.saveEventEntity(event);
  }

  public async update(event: EventUpdateInput): Promise<EventEntity> {
    let eventRecord = await this.eventRepository.findOne(event.id);
    // TODO refactoring tricky date update
    Object.assign(eventRecord, event, { date: new Date(event.date) });
    await eventRecord.validate();
    await this.eventRepository.save(eventRecord);
    return eventRecord;
  }

  // TODO move it to factory or something like that?
  protected createEventEntity(eventDTO: EventInput): EventEntity {
    try {
      const event: EventEntity = new EventEntity();
      // TODO refactoring tricky date update
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
