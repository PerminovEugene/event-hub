import {
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { AppError } from '../errors/app.error';

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    if (this.isAppError(exception)) {
      return (exception as AppError).clientError;
    }
    console.log('unhandled exception: ', exception);
    return new InternalServerErrorException();
  }

  protected isAppError = (exception: Error): boolean =>
    exception instanceof AppError;

  // protected getHots = (host: ArgumentsHost) => GqlArgumentsHost.create(host);
}
