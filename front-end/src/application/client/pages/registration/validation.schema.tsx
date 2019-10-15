import * as yup from 'yup';

let schema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email(`email must be valid`)
    .label('Email'),
  // TODO move magic constants to configuration file
  password: yup
    .string()
    .required()
    .min(6)
    .max(18)
    .label('Password'),
  passwordRepeat: yup
    .string()
    .required()
    .min(6)
    .max(18)
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Password repeat'),
});

export default schema;
