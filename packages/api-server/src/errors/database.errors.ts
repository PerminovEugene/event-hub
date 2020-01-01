import { AppError } from './app.error';
import { HttpException } from '@nestjs/common';

export class DatabaseError extends AppError {
  constructor(msg: string, sourceError: Error, clientError: HttpException) {
    super(msg, sourceError, clientError);
  }
}
