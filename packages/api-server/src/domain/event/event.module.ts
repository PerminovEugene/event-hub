import { Module, Scope } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DatabaseModule } from '../../database/database.module';
import { TagDataLoader } from '../tag/tag.loader';
import { TagModule } from '../tag/tag.module';
import { TagService } from '../tag/tag.service';
import { Event } from './event.entity';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

@Module({
  imports: [DatabaseModule, TagModule],
  providers: [
    {
      provide: 'EVENT_REPOSITORY', // TODO
      useFactory: (connection: Connection) => connection.getRepository(Event),
      inject: ['DATABASE_CONNECTION'],
    },
    EventService,
    EventResolver,
    {
      inject: [TagService],
      useFactory: TagDataLoader.create,
      provide: TagDataLoader,
      scope: Scope.REQUEST,
    },
    // TagLoader,
    // {
    //   provide: APP_INTERCEPTO,
    //   useClass: DataLoaderInterceptor,
    // },
  ],
  exports: [EventService],
})
export class EventModule {}
