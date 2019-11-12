import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlLoginGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    // const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);

    const result = (await super.canActivate(context)) as boolean;
    if (result) {
      const request = this.getRequest(context);
      await super.logIn(request);
    }
    return result;
  }

  getRequest(context: ExecutionContext) {
    const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);
    /*
          I don't know why, but passport couldn't receive username and password from graphql format, it's small hack
        */
    const req = ctx.getContext().req;
    req.query = ctx.getArgs();
    return req;
  }

  getResponse(context: ExecutionContext) {
    const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);
    /*
          I don't know why, but passport couldn't receive username and password from graphql format, it's small hack
        */
    const req = ctx.getContext().req;
    return req.res;
  }
}