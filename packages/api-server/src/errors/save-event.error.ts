import { BadRequestException } from '@nestjs/common';
import { DatabaseError } from './database.errors';

export class SaveEventError extends DatabaseError {
  constructor(sourceError: Error, msg?: string) {
    super(sourceError, msg);
    this._clientError = new BadRequestException('Invalid event data');
  }
}
