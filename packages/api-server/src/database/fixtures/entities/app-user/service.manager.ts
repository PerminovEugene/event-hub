import { Connection } from 'typeorm';
import { RepoMock } from '../../repository.mock';
import { ServiceManager } from '../../service.manager';
import { AppUserService } from '../../../../app-user/app-user.service';
import { AppUser } from './../../../../app-user/app-user.entity';

export class AppUserServiceManager implements ServiceManager {
  private service: AppUserService = null;

  constructor(connection: Connection) {
    const repo: any = new RepoMock(AppUser, connection);
    this.service = new AppUserService(repo);
  }

  public insert = async ({ email, password, role }) => {
    return await this.service.create(email, password, role);
  };
}
