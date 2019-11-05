import { HttpException } from '@nestjs/common';

export abstract class AppError extends Error {
  protected _clientError: HttpException;

  constructor(msg?: string) {
    super(msg);
  }

  get clientError(): HttpException {
    return this._clientError;
  }
}
