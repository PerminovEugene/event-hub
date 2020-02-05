import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getRequest, getResponse } from './gql.guard-methods';

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
    return getRequest(context);
  }

  getResponse(context: ExecutionContext) {
    return getResponse(context);
  }
}
