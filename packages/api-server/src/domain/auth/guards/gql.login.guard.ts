import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlGuard } from './gql.guard';
import { getRequest, getResponse } from './gql.guard-methods';

@Injectable()
export class GqlLoginGuard extends GqlGuard {
  async canActivate(context: ExecutionContext) {
    return await super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    return getRequest(context, 'loginInput');
  }

  getResponse(context: ExecutionContext) {
    return getResponse(context);
  }
}
