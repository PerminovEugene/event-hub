import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DatabaseModule } from '../../database/database.module';
import { Event } from './event.entity';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

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
