import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
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
      passport couldn't receive username and password from graphql format without tunning,
      it expects username and password in body or query, but body is busy by gql data,
      so, we add these fields in req.query
    */
    const req = ctx.getContext().req;
    req.query = ctx.getArgs();
    return req;
  }

  getResponse(context: ExecutionContext) {
    const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);
    /*
      Passport couldn't receive username and password from graphql format, this is small hack
    */
    const req = ctx.getContext().req;
    return req.res;
  }
}
