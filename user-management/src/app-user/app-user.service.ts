import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppUser as AppUserEntity, Status } from './app-user.entity';
import { AppUserInput, AppUser } from '../graphql';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class AppUserService {
  constructor(
    @Inject('APP_USER_REPOSITORY')
    private readonly appUserRepository: Repository<AppUserEntity>,
  ) {}

  public async findByEmailPassword(
    email: string,
    password: string,
  ): Promise<AppUser> {
    const user: AppUserEntity = (await this.appUserRepository.find({
      email,
    }))[0]; //TODO find beter way :)
    if (
      !user ||
      !this.passwordIsCorrect(user.password, user.salt, password) ||
      !this.userStatusAllowToLogin(user.status)
    ) {
      return null;
    }
    return {
      email: user.email,
      status: user.status,
      role: user.role,
      id: user.id,
    };
  }

  private async passwordIsCorrect(
    userPassword: string,
    userSalt: string,
    password: string,
  ): Promise<boolean> {
    const hashedPassword = await this.hashText(password, userSalt);
    return userPassword === hashedPassword;
  }

  private userStatusAllowToLogin(status: Status) {
    return status === Status.active;
  }

  public async create(user: AppUserInput): Promise<AppUser> {
    const salt = await this.generateSalt();
    const hashedPassword = await this.hashText(user.password, salt);
    const role = 'customer'; // TODO move to enums
    const status = Status.active;
    const result = await this.appUserRepository.insert({
      email: user.email,
      password: hashedPassword,
      salt,
      role,
      status,
    });
    // TODO check email unique
    return { email: user.email, status, id: result.raw[0].id, role } as any;
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
