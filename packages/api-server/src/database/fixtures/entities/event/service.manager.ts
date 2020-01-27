import { Connection } from 'typeorm';
import { Event } from '../../../../domain/event/event.entity';
import { EventService } from '../../../../domain/event/event.service';
import { RepoMock } from '../../repository.mock';
import { ServiceManager } from '../../service.manager';

export class EventServiceManager implements ServiceManager {
  private service: EventService = null;

  constructor(connection: Connection) {
    const repo: any = new RepoMock(Event, connection);
    this.service = new EventService(repo);
  }

  public insert = async data => {
    return await this.service.create(data);
  };
}
