import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { DatabaseModule } from '../database/database.module';
import { EventResolver } from './event.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'EVENT_REPOSITORY', // TODO
      useFactory: (connection: Connection) => connection.getRepository(Event),
      inject: ['DATABASE_CONNECTION'],
    },
    EventService,
    EventResolver,
  ],
  exports: [EventService],
})
export class EventModule {}
