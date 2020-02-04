import { TagService } from 'src/domain/tag/tag.service';
import { Connection } from 'typeorm';
import { Event } from '../../../../domain/event/event.entity';
import { EventService } from '../../../../domain/event/event.service';
import { Tag } from '../../../../domain/tag/tag.entity';
import { RepoMock } from '../../repository.mock';
import { ServiceManager } from '../../service.manager';

export class EventServiceManager implements ServiceManager {
  private service: EventService = null;

  constructor(connection: Connection) {
    const eventRepository: any = new RepoMock(Event, connection);
    const tagRepository: any = new RepoMock(Tag, connection);
    const tagService = new TagService(tagRepository);
    this.service = new EventService(eventRepository, tagService);
  }

  public insert = async data => {
    return await this.service.create(data);
  };
}
