import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AppUser, AppUserInput } from '../graphql';
import { AppUserService } from './app-user.service';

@Resolver('User')
export class AppUserResolver {
  constructor(private readonly appUserService: AppUserService) {}

  @Mutation()
  async registration(
    @Args('user')
    user: AppUserInput,
  ): Promise<AppUser> {
    return await this.appUserService.create(user);
  }

  @Query('login')
  async login(
    @Args('email')
    email: string,
    @Args('password')
    password: string,
  ): Promise<AppUser> {
    return await this.appUserService.findByEmailPassword(email, password);
  }
}
