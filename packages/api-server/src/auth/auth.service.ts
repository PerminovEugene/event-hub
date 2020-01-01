import { Injectable } from '@nestjs/common';
import { AppUserService } from '../app-user/app-user.service';
import * as bcrypt from 'bcrypt';
import { Status, AppUser } from '../app-user/app-user.entity';
import { SessionData, RegistrationInput } from '@calendar/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly appUsersService: AppUserService, // private readonly prisma: PrismaService,
  ) {}

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
