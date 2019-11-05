import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppUser as AppUserEntity, Status } from './app-user.entity';
// import { AppUserInput, AppUser } from '../graphql';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class AppUserService {
  constructor(
    @Inject('APP_USER_REPOSITORY')
    private readonly appUserRepository: Repository<AppUserEntity>,
  ) {}

  public async findByEmail(email: string): Promise<AppUserEntity> {
    return (await this.appUserRepository.find({
      email,
    }))[0];
  }

  public async create(email: string, password: string): Promise<any> {
    const salt = await this.generateSalt();
    const hashedPassword = await this.hashText(password, salt);
    const role = 'customer'; // TODO move to enums
    const status = Status.active;
    const result = await this.appUserRepository.insert({
      email,
      password: hashedPassword,
      salt,
      role,
      status,
    });
    // TODO check email unique
    return { email, status, id: result.raw[0].id, role } as any;
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
