import { AppError } from './app.error';

export class DatabaseError extends AppError {
  constructor(sourceError: Error, msg?: string) {
    super(msg, sourceError);
  }
}
