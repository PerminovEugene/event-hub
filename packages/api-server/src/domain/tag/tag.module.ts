import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DatabaseModule } from '../../database/database.module';
import { Tag } from './tag.entity';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'TAG_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(Tag),
      inject: ['DATABASE_CONNECTION'],
    },
    TagResolver,
    TagService,
  ],
  exports: [TagService],
})
export class TagModule {}
