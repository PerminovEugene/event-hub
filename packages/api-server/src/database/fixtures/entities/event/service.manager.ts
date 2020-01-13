import { Connection } from 'typeorm';
import { RepoMock } from '../../repository.mock';
import { ServiceManager } from '../../service.manager';
import { EventService } from '../../../../event/event.service';
import { Event } from '../../../../event/event.entity';

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
