import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authenticate } from 'passport';
import { getRequest, getResponse } from './gql.guard-methods';

@Injectable()
export class GqlGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    try {
      const result = (await super.canActivate(context)) as boolean;
      if (result) {
        const request = this.getRequest(context);
        await super.logIn(request);
      }
      return result;
    } catch (e) {
      console.log(e.message);
      // TODO
    }
  }

  getRequest(context: ExecutionContext) {
    return getRequest(context);
  }

  getResponse(context: ExecutionContext) {
    return getResponse(context);
  }
}

const authentificate = (req, res) => {
  return new Promise((resolve, reject) => {
    authenticate('local', {}, (err, user, info) => {
      try {
        req.authInfo = info;
        return resolve({ err, user, info });
      } catch (err) {
        reject(err);
      }
    })(req, res);
  });
};
