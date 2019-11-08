import { ValidationError } from 'class-validator';

export type ClientValidationErrorFormat = {
  [key: string]: string;
};

export const convertClassValidatiorErrorToClient = (
  errors: ValidationError[],
): ClientValidationErrorFormat => {
  const result: ClientValidationErrorFormat = {};
  errors.forEach((error: ValidationError) => {
    result[error.property] = mergeErrorMessages(error.constraints);
  });
  return result;
};

const mergeErrorMessages = (constraints: { [key: string]: string }) => {
  return Object.values(constraints).reduce(
    (mergedErrors: string, currentError: string) =>
      mergedErrors !== ''
        ? `${mergedErrors}. ${currentError}`
        : `${currentError}.`,
    '',
  );
};
