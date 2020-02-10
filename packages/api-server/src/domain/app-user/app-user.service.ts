import { Role } from '@event-hub/shared';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { wrapDbError } from '../../database/helpers/database-errors.hander';
import { getInsertResult } from '../../database/helpers/query-result.manager';
import { generateSalt, hashText } from '../../facades/crypto';
import { AppUser as AppUserEntity, Status } from './app-user.entity';

@Injectable()
export class AppUserService {
  constructor(
    @Inject('APP_USER_REPOSITORY')
    private readonly appUserRepository: Repository<AppUserEntity>,
  ) {}

  public async findByEmail(email: string): Promise<AppUserEntity> {
    return (
      await this.appUserRepository.find({
        email,
      })
    )[0];
  }

  public async create(
    email: string,
    password: string,
    role?: Role,
  ): Promise<AppUserEntity> {
    const salt = await generateSalt();
    const hashedPassword = await hashText(password, salt);
    role = role || Role.client;
    const status = Status.active;
    const parameters = {
      email,
      password: hashedPassword,
      salt,
      role,
      status,
    };
    try {
      const insertResult = await this.appUserRepository.insert(parameters);
      return {
        email,
        status,
        id: getInsertResult(insertResult).id,
        role,
      } as AppUserEntity;
    } catch (e) {
      throw wrapDbError(e, parameters);
    }
  }
}
