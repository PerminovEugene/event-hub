import { BadRequestException } from '@nestjs/common';
import { AppError } from './app.error';
import { convertClassValidatiorErrorToClient } from '../adapters/class-validator-error.to.client-error';
import { ValidationError } from 'class-validator';

export class ValidationEntityError extends AppError {
  protected _sourceErrors: ValidationError[];

  constructor(sourceError: ValidationError[], msg?: string) {
    super(msg, sourceError);
    this._clientError = new BadRequestException(
      convertClassValidatiorErrorToClient(sourceError),
    );
  }
}
