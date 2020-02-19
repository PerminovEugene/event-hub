import { BadRequestException } from '@nestjs/common';
import { DatabaseError } from './database.errors';

export class SaveEventError extends DatabaseError {
  constructor(msg: string, sourceError?: Error) {
    super(msg, sourceError, new BadRequestException('Invalid event data'));
  }
}
