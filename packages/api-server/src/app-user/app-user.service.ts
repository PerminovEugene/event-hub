import { Role } from '@calendar/shared';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { wrapDbError } from '../database/helpers/database-errors.hander';
import { getInsertResult } from '../database/helpers/query-result.manager';
import { AppUser as AppUserEntity, Status } from './app-user.entity';

const SALT_ROUNDS = 10;

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
    const salt = await this.generateSalt();
    const hashedPassword = await this.hashText(password, salt);
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

  public async generateSalt(): Promise<string> {
    return await bcrypt.genSalt(SALT_ROUNDS);
  }

  public async hashText(
    myPlaintextPassword: string,
    salt: string,
  ): Promise<string> {
    return await bcrypt.hash(myPlaintextPassword, salt);
  }
}
