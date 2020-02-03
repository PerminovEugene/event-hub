import { RegistrationInput, SessionData } from '@calendar/shared';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppUser, Status } from '../app-user/app-user.entity';
import { AppUserService } from '../app-user/app-user.service';

@Injectable()
export class AuthService {
  constructor(private readonly appUsersService: AppUserService) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<SessionData> {
    const user: AppUser = await this.appUsersService.findByEmail(email);
    if (!(await this.isUserCanLogin(user, password))) {
      return null;
    }
    return this.makeSessionDataByUser(user);
  }

  public async registration(input: RegistrationInput) {
    const user: AppUser = await this.appUsersService.create(
      input.email,
      input.password,
    );
    return this.makeSessionDataByUser(user);
  }

  // UTILS

  private async isUserCanLogin(user: any, password: string): Promise<boolean> {
    return (
      user &&
      (await this.isPasswordCorrect(user.password, user.salt, password)) &&
      this.isUserStatusAllowedLogin(user.status)
    );
  }

  private async isPasswordCorrect(
    userPassword: string,
    userSalt: string,
    password: string,
  ): Promise<boolean> {
    const hashedPassword = await this.hashText(password, userSalt);
    return userPassword === hashedPassword;
  }

  private isUserStatusAllowedLogin(status: Status): boolean {
    return status === Status.active;
  }

  private async hashText(
    myPlaintextPassword: string,
    salt: string,
  ): Promise<string> {
    return await bcrypt.hash(myPlaintextPassword, salt);
  }

  private makeSessionDataByUser(user: AppUser): SessionData {
    return {
      email: user.email,
      status: user.status,
      role: user.role,
      id: user.id,
    };
  }
}
