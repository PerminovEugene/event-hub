import { EventsFiltersInput } from '@calendar/shared';
import { INestApplication } from '@nestjs/common';
import { Connection } from 'typeorm';
import { testRequest } from '../facades/tests';
import { e2eSpecInitalizer } from '../framework/test/e2e/e2e.uitls';
import { Event } from './event.entity';
import { defineEvent } from './event.factory';
import { EventModule } from './event.module';

describe.only('Event e2e', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    ({ app, connection } = await e2eSpecInitalizer({
      importedModules: [EventModule],
    }));
  });

  describe('Event list', () => {
    it('When no filters provided, then returns list of events', async () => {
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

      const error = err || res.body.errors;
      await connection
        .createQueryBuilder()
        .delete()
        .from(Event)
        .whereInIds(ids)
        .execute();
      expect(error).not.toBeDefined();
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
  });

  describe('Create event', () => {
    it('When eventInput is correct, then returns created event', async () => {
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

      const error = err || res.body.errors;
      expect(error).not.toBeDefined();

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
  });

  afterAll(async () => {
    await app.close();
  });
});
