import { Injectable } from '@nestjs/common';
import { AppUserService } from '../app-user/app-user.service';
import * as bcrypt from 'bcrypt';
import { Status } from '../app-user/app-user.entity';

// import { PrismaService } from '../prisma/prisma.service';
// import { User } from '../../generated/prisma-client';

@Injectable()
export class AuthService {
  constructor(
    private readonly appUsersService: AppUserService, // private readonly prisma: PrismaService,
  ) {}

  // new
  // async validate({ id }): Promise<any> {
  //   // const user = await this.prisma.client.user({ id });
  //   if (!user) {
  //     throw Error('Authenticate validation error');
  //   }
  //   return user;
  // }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.appUsersService.findByEmail(email);
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

  public async login(user: any) {
    return {
      email: user.email,
      status: user.status,
      role: user.role,
      id: user.id,
    };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
  }

  public async registration(input: any) {
    const user = await this.appUsersService.create(input.email, input.password);
    return {};
  }

  // UTILS

  private async passwordIsCorrect(
    userPassword: string,
    userSalt: string,
    password: string,
  ): Promise<boolean> {
    const hashedPassword = await this.hashText(password, userSalt);
    return userPassword === hashedPassword;
  }

  // TODO rename
  private userStatusAllowToLogin(status: Status) {
    return status === Status.active;
  }

  private async hashText(
    myPlaintextPassword: string,
    salt: string,
  ): Promise<string> {
    return await bcrypt.hash(myPlaintextPassword, salt);
  }
}
