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

const EVENT_NAME_MIN_LENGTH = 2;
const EVENT_NAME_MAX_LENGTH = 18;
const EVENT_DESCRIPTION_MIN_LENGTH = 2;
const EVENT_DESCRIPTION_MAX_LENGTH = 60;

export const eventNameValidation = yup
  .string()
  .required()
  .min(EVENT_NAME_MIN_LENGTH)
  .max(EVENT_NAME_MAX_LENGTH)
  .label('Name');

export const eventDescriptionValidation = yup
  .string()
  .required()
  .min(EVENT_DESCRIPTION_MIN_LENGTH)
  .max(EVENT_DESCRIPTION_MAX_LENGTH)
  .label('Description');

// TODO
export const eventTypeValidation = yup
  .string()
  .required()
  .min(1)
  .max(30)
  .label('Type');
