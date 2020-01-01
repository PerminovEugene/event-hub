import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { GqlLoginGuard } from './guards/gql.login.guard';
import { GqlAuthenticationGuard } from './guards/gql.authentification.guard';
import { UseGuards } from '@nestjs/common';
// import { CurrentUser } from '../auth/user.decorator';
import { CurrentUser } from './user.decorator';
import { SessionData, LoginInput, RegistrationInput } from '@calendar/shared';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('registration')
  async registration(
    @Args('registrationInput')
    input: RegistrationInput,
    @Context()
    context: any,
  ): Promise<any> {
    const sessionData: SessionData = await this.authService.registration(input);
    await this.createSession(context, sessionData);
    return sessionData;
  }

  private createSession = (context: any, sessionData: SessionData) => {
    return new Promise((resolve, reject) => {
      // passport have no login through Promise :(
      context.req.login(sessionData, (error: Error) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      });
    });
  };

  @UseGuards(GqlLoginGuard)
  @Mutation('login')
  async login(
    @Args('loginInput')
    loginInput: LoginInput,
    @Context() context: any,
  ): Promise<any> {
    return context.req.user;
  }

  @Mutation('logout')
  async logout(@Context() context: any): Promise<boolean> {
    context.req.logout();
    return true;
  }

  @Query(returns => SessionData)
  @UseGuards(GqlAuthenticationGuard)
  whoAmI(@CurrentUser() user: any) {
    return user;
  }
}
