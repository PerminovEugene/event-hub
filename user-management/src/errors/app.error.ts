import { HttpException } from '@nestjs/common';

type SourceError = Error | any[];

export abstract class AppError extends Error {
  protected _clientError: HttpException;
  protected _sourceError: SourceError;

  constructor(msg?: string, sourceError?: SourceError) {
    super(msg);
    this._sourceError = sourceError;
  }

  get clientError(): HttpException {
    return this._clientError;
  }

  get sourceError(): SourceError {
    return this._sourceError;
  }
}
