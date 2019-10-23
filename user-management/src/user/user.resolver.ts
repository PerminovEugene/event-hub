import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { User, UserInput } from '../graphql';

@Resolver('User')
export class UserResolver {
  @Mutation()
  async registration(
    @Args('user')
    user: UserInput,
  ): Promise<User> {
    return {
      email: user.email,
      role: 'role',
      id: 1,
    };
  }

  @Query('login')
  async login(
    @Args('email')
    email: string,
    @Args('password')
    password: string,
  ): Promise<User> {
    return {
      id: 1,
      email: '2',
      role: '3',
    };
  }
}
