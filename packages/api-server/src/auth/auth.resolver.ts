import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { GqlLoginGuard } from './guards/gql.login.guard';
import { GqlAuthenticationGuard } from './guards/gql.authentification.guard';
import { UseGuards } from '@nestjs/common';
// import { CurrentUser } from '../auth/user.decorator';
import { CurrentUser } from './user.decorator';
import { SessionData } from '@calendar/shared';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('registration')
  async registration(
    @Args('registrationInput')
    registrationInput: any,
    @Context()
    context,
  ): Promise<any> {
    console.log(registrationInput);
    const saved = await this.authService.registration(registrationInput);
    debugger;
    // context.req.session = saved;
    return saved;
  }

  @UseGuards(GqlLoginGuard)
  @Mutation('login')
  async login(
    @Args('loginInput')
    loginInput: any,
    @Context() ctx: any,
  ): Promise<any> {
    console.log(ctx.req);
    debugger;

    return ctx.req.user;
  }

  @Query(returns => SessionData)
  @UseGuards(GqlAuthenticationGuard)
  whoAmI(@CurrentUser() user: any) {
    return user;
  }
}
