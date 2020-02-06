import { RegistrationInput } from '@calendar/shared';
import { INestApplication } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { testRequest } from '../../../facades/tests';
import { e2eSpecInitalizer } from '../../../framework/test/e2e/e2e.uitls';
import { AuthModule } from '../../auth/auth.module';
import { passportLocalAuthConfig } from '../../auth/configurations/passport-local.configuration';
import { mutationRegistration } from '../../auth/spec/auth.requests';
import { Tag } from '../../tag/tag.entity';
import { Event } from './../event.entity';
import { EventModule } from './../event.module';
import {
  defineEvent,
  defineEvents,
  defineEventsWithTags,
  defineEventWithTags,
} from './event.factory';

describe('Event e2e', () => {
  let app: INestApplication;
  let connection: Connection;
  let eventRepository: Repository<Event>;
  let tagRepository: Repository<Tag>;
  let cookies: any;

  beforeAll(async () => {
    ({ app, connection } = await e2eSpecInitalizer({
      importedModules: [
        EventModule,
        AuthModule.forRoot(passportLocalAuthConfig),
      ],
    }));
    eventRepository = connection.getRepository(Event);
    tagRepository = connection.getRepository(Tag);

    /**
     * register new admin user and cache cookies for requests
     */
    const registrationInput: RegistrationInput = {
      email: 'e2e-spec.admin@mail.com',
      password: 'agadagsgad',
      passwordConfirm: 'agadagsgad',
    };
    const { err, res } = await testRequest({
      app,
      params: mutationRegistration(registrationInput),
      status: 200,
    });
    cookies = res.headers['set-cookie'];
  });

  describe('Get Event list', () => {
    it('When no filters provided and events have no tags, then returns list of events', async () => {
      const events = await defineEvents();
      const result = await eventRepository.insert(events);
      const ids = result.raw.map(o => o.id);

      const { err, res } = await testRequest({
        app,
        params: {
          operationName: 'getEvents',
          variables: {
            eventFiltersInput: {},
          },
          query: `query getEvents {
            events { 
              id
              name
              type
              description
            }
          }`,
        },
        status: 200,
      });

      expect(err).not.toBeDefined();
      expect(res.body.data.events).toEqual(
        events.map((event, i) => ({
          id: ids[i],
          name: event.name,
          description: event.description,
          type: event.type,
          // TODO Date will be added later
          // date: event.date
        })),
      );

      await eventRepository.delete(ids);
    });

    it('When no filters provided and events have tags, then returns list of events', async () => {
      const events = await defineEventsWithTags();
      // we have to save via .create because insert have no cascade
      const eventsEntities = eventRepository.create(events);
      const eventRecords = await eventRepository.save(eventsEntities);
      const ids = eventRecords.map(o => o.id);

      const { err, res } = await testRequest({
        app,
        params: {
          operationName: 'getEvents',
          variables: {
            eventFiltersInput: {},
          },
          query: `query getEvents {
            events { 
              id
              name
              type
              description
              tags {
                id
                name
              }
            }
          }`,
        },
        status: 200,
      });

      expect(err).not.toBeDefined();
      expect(res.body.data.events).toEqual(
        eventRecords.map((event, i) => ({
          id: event.id,
          name: event.name,
          description: event.description,
          type: event.type,
          tags: event.tags.map(tag => ({
            id: tag.id,
            name: tag.name,
          })),
          // TODO Date will be added later
          // date: event.date
        })),
      );

      await eventRepository.delete(ids);
    });
  });

  describe('Find Event by id', () => {
    it('When id is correct and event have no tags, then returns events', async () => {
      const event = await defineEvent();
      const eventRecord = await eventRepository.insert(event);
      const id = eventRecord.raw[0].id;

      const { err, res } = await testRequest({
        app,
        params: {
          operationName: 'getEvent',
          variables: {
            id,
          },
          query: `query getEvent($id: Int!) {
            event(id: $id) { 
              id
              name
              type
              description
              tags {
                id
                name
              }
            }
          }`,
        },
        status: 200,
      });

      expect(err).not.toBeDefined();
      expect(res.body.data.event).toEqual({
        id,
        name: event.name,
        description: event.description,
        type: event.type,
        tags: [],
        // TODO Date will be added later
        // date: event.date
      });

      await eventRepository.delete(id);
    });
  });

  describe('Create event', () => {
    it('When eventInput is correct and have not inner entities, then returns created event', async () => {
      const event = await defineEvent();

      const { err, res } = await testRequest({
        app,
        params: {
          operationName: 'createEvent',
          variables: {
            eventInput: event,
          },
          query: `mutation createEvent($eventInput: EventInput) {
            createEvent(eventInput: $eventInput) { 
              id
              name
              description
              type
            }
          }`,
        },
        status: 200,
        cookies,
      });

      expect(err).not.toBeDefined();
      const eventRecord: any = await eventRepository.findOne({
        name: event.name,
      });
      // .where('event.name = :name', { name: event.name })
      // .getOne();
      const id = eventRecord.id;
      expect(res.body.data.createEvent).toEqual({
        id: eventRecord.id,
        name: event.name,
        description: event.description,
        type: event.type,
      });

      await eventRepository.delete(id);
    });

    it('When eventInput is correct and has inner tags, then returns created event with tags', async () => {
      const event = await defineEventWithTags();

      const { err, res } = await testRequest({
        app,
        params: {
          operationName: 'createEvent',
          variables: {
            eventInput: event,
          },
          query: `mutation createEvent($eventInput: EventInput) {
            createEvent(eventInput: $eventInput) { 
              id
              name
              description
              type
              tags {
                id
                name
              }
            }
          }`,
        },
        status: 200,
        cookies,
      });

      expect(err).not.toBeDefined();
      const eventRecord = await eventRepository.findOne({
        where: { name: event.name },
        relations: ['tags'],
      });
      const id = eventRecord.id;
      expect(res.body.data.createEvent).toEqual({
        id,
        name: event.name,
        description: event.description,
        type: event.type,
        tags: eventRecord.tags.map(tag => ({
          id: tag.id,
          name: tag.name,
        })),
      });

      await eventRepository.delete(id);
      await tagRepository.delete(eventRecord.tags.map(tag => tag.id));
    });
  });

  describe('Update event', () => {
    it('When eventUpdateInput is correct, then returns updated event', async () => {
      const event = await defineEvent();
      const eventRecord = await eventRepository.insert(event);
      const id = eventRecord.raw[0].id;
      const updatedEvent: any = await defineEvent();
      updatedEvent.id = id;

      const { err, res } = await testRequest({
        app,
        params: {
          operationName: 'updateEvent',
          variables: {
            eventUpdateInput: updatedEvent,
          },
          query: `mutation updateEvent($eventUpdateInput: EventUpdateInput) {
            updateEvent(eventUpdateInput: $eventUpdateInput) { 
              id
              name
              description
              type
            }
          }`,
        },
        status: 200,
        cookies,
      });

      expect(err).not.toBeDefined();
      expect(res.body.data.updateEvent).toEqual({
        id,
        name: updatedEvent.name,
        description: updatedEvent.description,
        type: updatedEvent.type,
      });

      await eventRepository.delete(id);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
