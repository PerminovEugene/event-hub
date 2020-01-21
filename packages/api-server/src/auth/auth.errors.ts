import { BadRequestException } from '@nestjs/common';
import { AppError } from '../errors/app.error';

export class InvalidCredentialsError extends AppError {
  constructor() {
    super(null, null, new BadRequestException('Invalid email or password'));
  }
}
