import * as yup from 'yup';

// TODO move it in shared for backend project
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 18;

export const emailValidation = {
  email: yup
    .string()
    .required()
    .email(`email must be valid`)
    .label('Email'),
};
export const passwordValidation = {
  password: yup
    .string()
    .required()
    .min(PASSWORD_MIN_LENGTH)
    .max(PASSWORD_MAX_LENGTH)
    .label('Password'),
};
export const passwordRepeatValidation = {
  passwordRepeat: yup
    .string()
    .required()
    .min(PASSWORD_MIN_LENGTH)
    .max(PASSWORD_MAX_LENGTH)
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Password repeat'),
};