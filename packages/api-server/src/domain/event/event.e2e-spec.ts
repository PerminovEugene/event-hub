import { EventsFiltersInput } from '@calendar/shared';
import { INestApplication } from '@nestjs/common';
import { Connection, getRepository } from 'typeorm';
import { testRequest } from '../../facades/tests';
import { e2eSpecInitalizer } from '../../framework/test/e2e/e2e.uitls';
import { Event } from './event.entity';
import { defineEvent, defineEventWithTags } from './event.factory';
import { EventModule } from './event.module';

describe('Event e2e', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    ({ app, connection } = await e2eSpecInitalizer({
      importedModules: [EventModule],
    }));
  });

  describe('Get Event list', () => {
    it('When no filters provided and events have no tags, then returns list of events', async () => {
      const numberOfEvents = 5;
      const events = [];
      for (let i = 0; i < numberOfEvents; i++) {
        const event = await defineEvent();
        events.push(event);
      }
      const result = await connection
        .createQueryBuilder()
        .insert()
        .into(Event)
        .values(events)
        .execute();

      const ids = result.raw.map(o => o.id);

      const eventFiltersInput: EventsFiltersInput = {};
      const { err, res } = await testRequest({
        app,
        params: {
          operationName: 'getEvents',
          variables: {
            eventFiltersInput,
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

      await connection
        .createQueryBuilder()
        .delete()
        .from(Event)
        .whereInIds(ids)
        .execute();
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
    });

    it('When no filters provided and events have tags, then returns list of events', async () => {
      const numberOfEvents = 5;
      const sourceEvents = [];
      for (let i = 0; i < numberOfEvents; i++) {
        const event = await defineEventWithTags();
        sourceEvents.push(event);
      }
      const events = await getRepository(Event).create(sourceEvents);
      await getRepository(Event).save(events);

      const ids = events.map(o => o.id);

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

      await getRepository(Event).delete(ids);
      expect(err).not.toBeDefined();
      expect(res.body.data.events).toEqual(
        sourceEvents.map((event, i) => ({
          id: ids[i],
          name: event.name,
          description: event.description,
          type: event.type,
          tags: expect.arrayContaining(
            event.tags.map(tag => ({
              id: expect.any(Number),
              name: tag.name,
            })),
          ),
          // TODO Date will be added later
          // date: event.date
        })),
      );
    });
  });

  describe('Find Event by id', () => {
    it('When id is correct and event have no tags, then returns events', async () => {
      const event = await defineEvent();
      const result = await connection
        .createQueryBuilder()
        .insert()
        .into(Event)
        .values([event])
        .execute();

      const id = result.raw[0].id;

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

      await connection
        .createQueryBuilder()
        .delete()
        .from(Event)
        .whereInIds([id])
        .execute();

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
      });

      expect(err).not.toBeDefined();

      const eventRecord: any = await connection
        .createQueryBuilder()
        .select('event')
        .from(Event, 'event')
        .where('event.name = :name', { name: event.name })
        .getOne();

      const id = eventRecord.id;
      await connection
        .createQueryBuilder()
        .delete()
        .from(Event)
        .where('id = :id', { id })
        .execute();

      expect(res.body.data.createEvent).toEqual({
        id,
        name: event.name,
        description: event.description,
        type: event.type,
      });
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
      });
      expect(err).not.toBeDefined();

      const eventRecord = await getRepository(Event).findOne({
        where: { name: event.name },
        relations: ['tags'],
      });

      const id = eventRecord.id;
      await connection
        .createQueryBuilder()
        .delete()
        .from(Event)
        .where('id = :id', { id })
        .execute();

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
    });
  });

  describe('Update event', () => {
    it('When eventUpdateInput is correct, then returns updated event', async () => {
      const event = await defineEvent();
      const result = await connection
        .createQueryBuilder()
        .insert()
        .into(Event)
        .values([event])
        .execute();
      const id = result.raw[0].id;
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
      });

      expect(err).not.toBeDefined();
      await connection
        .createQueryBuilder()
        .delete()
        .from(Event)
        .where('id = :id', { id })
        .execute();

      expect(res.body.data.updateEvent).toEqual({
        id,
        name: updatedEvent.name,
        description: updatedEvent.description,
        type: updatedEvent.type,
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
