import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';

export const getRequest = (context: ExecutionContext, field?: string) => {
  const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);
  const req = ctx.getContext().req;
  /*
      passport couldn't receive username and password from graphql format without tunning,
      it expects username and password in body or query, but body is busy by gql data,
      so, we add these fields in req.query
    */
  req.query = field ? ctx.getArgs()[field] : ctx.getArgs(); // TODO move it in login guard
  return req;
};

export const getResponse = (context: ExecutionContext) => {
  const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);
  const req = ctx.getContext().req;
  return req.res;
};
