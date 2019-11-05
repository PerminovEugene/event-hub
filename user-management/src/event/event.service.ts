import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event as EventEntity } from './event.entity';
import { EventInput, Event } from '../graphql';
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

  public async createEvent(eventDTO: EventInput): Promise<EventEntity> {
    try {
      const newEvent: EventEntity = new EventEntity();
      Object.assign(newEvent, eventDTO);
      const event: EventEntity = await this.eventRepository.create(newEvent);
      await this.eventRepository.save(event);
      return event;
    } catch (e) {
      throw new SaveEventError(e);
    }
  }

  // public async createEvent(data): Promise<any> {
  //   const result = await this.appUserRepository.insert({
  //     email,
  //     password: hashedPassword,
  //     salt,
  //     role,
  //     status,
  //   });
  //   // TODO check email unique
  //   return { email, status, id: result.raw[0].id, role } as any;
  // }
}
