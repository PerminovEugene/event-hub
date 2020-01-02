import { getValidationSchema } from '../../../../../framework/validation/index';
import {
  emailValidation,
  passwordValidation,
  passwordConfirmValidation,
} from '../../../../../framework/validation/fields-rules';

const getRegistrationValidationSchema = () =>
  getValidationSchema({
    email: emailValidation,
    password: passwordValidation,
    passwordConfirm: passwordConfirmValidation,
  });

export default getRegistrationValidationSchema;
