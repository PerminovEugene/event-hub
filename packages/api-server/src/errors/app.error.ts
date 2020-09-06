import { HttpException } from '@nestjs/common';

type SourceError = Error | any[];

export abstract class AppError extends Error {
  protected _sourceError: SourceError;
  protected _clientError: HttpException;

  constructor(
    msg?: string,
    sourceError?: SourceError,
    clientError?: HttpException,
  ) {
    super(msg);
    this._sourceError = sourceError;
    this._clientError = clientError;
  }

  get clientError(): HttpException {
    return this._clientError;
  }

  get sourceError(): SourceError {
    return this._sourceError;
  }
}
