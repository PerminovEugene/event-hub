import { Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);
    /*
      I don't know why, but passport couldn't receive username and password from graphql format, it's small hack
    */
    const req = ctx.getContext().req;
    req.query = ctx.getArgs();
    return req;
  }
}

// @Injectable()
// export class GqlRegistrationAuthGuard extends AuthGuard('local') {
//   getRequest(context: ExecutionContext) {
//     const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);
//     /*
//       I don't know why, but passport couldn't receive username and password from graphql format, it's small hack
//     */
//     const req = ctx.getContext().req;
//     req.query = ctx.getArgs();
//     return req;
//   }
// }
