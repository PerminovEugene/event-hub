import { EventsFiltersInput } from '@calendar/shared';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Connection, getConnection } from 'typeorm';
import { getGraphqlConfig } from '../config/app/graphql.config';
import { initConfigService } from '../config/environment/service';
import { AppType, Director } from '../core/app/app.director';
import { TestE2eAppBuilder } from '../core/app/teste2e.app.builder';
import { testRequest } from '../facades/tests';
import { Event } from './event.entity';
import { defineEvent } from './event.factory';
import { EventModule } from './event.module';

describe.only('Event e2e', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    jest.setTimeout(300000);
    initConfigService({ filePrefix: 'test-e2e' });
    const builder = new TestE2eAppBuilder({
      imports: [
        EventModule,
        GraphQLModule.forRootAsync({
          useFactory: () => getGraphqlConfig(),
        }),
      ],
    });
    const director = new Director(builder);
    await director.make(AppType.testE2e);
    app = builder.getApp();
    await app.init();
    connection = getConnection('default');
  });

  describe('Event list', () => {
    it.only('When no filters provided, then returns list of events', async () => {
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

  afterAll(async () => {
    await app.close();
  });
});
