import { AppError } from './app.error';

export class DatabaseError extends AppError {
  protected _sourceError: Error;

  constructor(sourceError: Error, msg?: string) {
    super(msg);
    this._sourceError = sourceError;
  }
}
