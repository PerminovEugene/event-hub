import { Injectable } from '@nestjs/common';
import { AppUserService } from '../app-user/app-user.service';
import * as bcrypt from 'bcrypt';
import { Status } from '../app-user/app-user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly appUsersService: AppUserService, // private readonly prisma: PrismaService,
  ) {}

  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.appUsersService.findByEmail(email);
    if (!(await this.isUserCanLogin(user, password))) {
      return null;
    }

    return {
      email: user.email,
      status: user.status,
      role: user.role,
      id: user.id,
    };
  }

  public async login(user: any) {
    return {
      email: user.email,
      status: user.status,
      role: user.role,
      id: user.id,
    };
  }

  public async registration(input: any) {
    const user = await this.appUsersService.create(input.email, input.password);
    return {};
  }

  // UTILS

  // TODO any
  private async isUserCanLogin(user: any, password: string) {
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

  // TODO rename
  private isUserStatusAllowedLogin(status: Status) {
    return status === Status.active;
  }

  private async hashText(
    myPlaintextPassword: string,
    salt: string,
  ): Promise<string> {
    return await bcrypt.hash(myPlaintextPassword, salt);
  }
}
