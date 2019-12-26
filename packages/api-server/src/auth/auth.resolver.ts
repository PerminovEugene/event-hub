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
    registrationInput: RegistrationInput,
    @Context()
    context,
  ): Promise<any> {
    console.log(registrationInput);
    const saved = await this.authService.registration(registrationInput);
    // context.req.session = saved;
    return saved;
  }

  @UseGuards(GqlLoginGuard)
  @Mutation('login')
  async login(
    @Args('loginInput')
    loginInput: LoginInput,
    @Context() ctx: any,
  ): Promise<any> {
    return ctx.req.user;
  }

  @Mutation('logout')
  async logout(@Context() ctx: any): Promise<boolean> {
    const req: any = ctx.req;
    // const res: any = ctx.res;
    await req.logout();
    // req.session = null;
    // res.clearCookie('test');
    // res.clearCookie('test.sig');
    // debugger;
    // console.log(ctx.req);
    return true;
  }

  @Query(returns => SessionData)
  @UseGuards(GqlAuthenticationGuard)
  whoAmI(@CurrentUser() user: any) {
    return user;
  }
}
