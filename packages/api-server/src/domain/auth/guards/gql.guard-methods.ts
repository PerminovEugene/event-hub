import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';

export const getRequest = (context: ExecutionContext, field?: string) => {
  const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);
  /*
      passport couldn't receive username and password from graphql format without tunning,
      it expects username and password in body or query, but body is busy by gql data,
      so, we add these fields in req.query
    */
  const req = ctx.getContext().req;
  req.query = field ? ctx.getArgs()[field] : ctx.getArgs();
  return req;
};

export const getResponse = (context: ExecutionContext) => {
  const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);
  const req = ctx.getContext().req;
  return req.res;
};
