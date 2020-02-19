import { Connection } from 'typeorm';

export class RepoMock {
  protected entity = null;
  protected connection = null;

  constructor(entity: any, connection: Connection) {
    this.entity = entity;
    this.connection = connection;
  }

  public insert = async params => {
    return await this.connection
      .createQueryBuilder()
      .insert()
      .into(this.entity)
      .values([params])
      .execute();
  };

  public save = async entityInstance => {
    const repo = this.connection.getRepository(this.entity);
    return await repo.save(entityInstance);
  };
}
