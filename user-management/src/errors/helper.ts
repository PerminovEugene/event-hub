import { AppError } from './app.error';

export const handleError = (error: Error) => {
  debugger;
  if (error instanceof AppError) {
    throw error.clientError;
  } else {
    // TODO add logger
    console.log('unhandled exception: ', error);
    throw error;
  }
};
