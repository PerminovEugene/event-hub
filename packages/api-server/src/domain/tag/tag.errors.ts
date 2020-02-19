import { BadRequestException } from '@nestjs/common';
import { AppError } from '../../errors/app.error';

export class TagEntityCreationError extends AppError {
  constructor(msg: string, sourceError?: Error) {
    super(msg, sourceError, new BadRequestException('Invalid tag data'));
  }
}
