import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from '../auth/gql.guard';
import { UseGuards } from '@nestjs/common';
// import { CurrentUser } from '../auth/user.decorator';
// import { Request, Response } from 'express';
import { CurrentUser } from './user.decorator';
import { SessionData } from '../graphql';

// export interface MyContext {
//   req: any; // Request (any);
//   res: Response;
// }

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async registration(
    @Args('user')
    registrationInput: any,
    // @Context() ctx: MyContext,
  ): Promise<any> {
    console.error('qweqw');
    const saved = await this.authService.registration(registrationInput);
    // ctx.req.session.userId = saved.id;
    return saved;
  }

  @Query('login')
  @UseGuards(GqlAuthGuard)
  async login(
    // @Args('LoginInput')
    // loginInput: any,
    // @Args('email')
    // email: string,
    // @Args('password')
    // password: string,

    @Context() ctx: any,
  ): Promise<any> {
    console.error('qweqw1');
    // const user = {}await this.authService.login({ email, password });
    // ctx.req.session.userId = 1; //user.id;
    // return user;
    debugger;
    return ctx.user;
  }

  // @Query(returns => SessionData)
  // @UseGuards(GqlAuthGuard)
  // whoAmI(@CurrentUser() user: any) {
  //   debugger;
  //   console.log(user);
  //   return user;
  // }

  // @Mutation(() => [ErrorResponse], { nullable: true })
  // async signup(
  //   @Args('signupInput') signupInput: SignupInput,
  // ): Promise<ErrorResponse[] | null> {
  //   return this.userService.signup(signupInput);
  // }

  // @Mutation(() => [ErrorResponse], { nullable: true })
  // async login(
  //   @Args('loginInput') loginInput: LoginInput,
  //   @Context() ctx: MyContext,
  // ): Promise<ErrorResponse[] | null> {
  //   return this.userService.login(loginInput, ctx.req);
  // }

  // @Mutation(() => Boolean)
  // async logout(@Context() ctx: MyContext) {
  //   return this.userService.logout(ctx);
  // }
}
