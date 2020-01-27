import {
  ArgumentsHost,
  Catch,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { AppError } from '../errors/app.error';

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const response = gqlHost.getContext().res;

    if (this.isAppError(exception)) {
      const clientError = (exception as AppError).clientError;
      // return response.status(clientError.getStatus()).json({
      //   errors: clientError.message,
      // });
      return clientError;
    }
    console.log('unhandled exception: ', exception);
    return new InternalServerErrorException();
  }

  protected isAppError = (exception: Error): boolean =>
    exception instanceof AppError;

  // protected getHots = (host: ArgumentsHost) => GqlArgumentsHost.create(host);
}
