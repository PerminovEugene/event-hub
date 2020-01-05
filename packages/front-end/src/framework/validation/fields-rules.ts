import * as yup from 'yup';

// TODO move it in shared for backend project
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 18;

export const emailValidation = yup
  .string()
  .required()
  .email(`Email must be valid`)
  .label('Email');

export const passwordValidation = yup
  .string()
  .required()
  .min(PASSWORD_MIN_LENGTH)
  .max(PASSWORD_MAX_LENGTH)
  .label('Password');

export const passwordConfirmValidation = yup
  .string()
  .required()
  .min(PASSWORD_MIN_LENGTH)
  .max(PASSWORD_MAX_LENGTH)
  .oneOf([yup.ref('password'), null], 'Passwords must match')
  .label('Password confirm');
