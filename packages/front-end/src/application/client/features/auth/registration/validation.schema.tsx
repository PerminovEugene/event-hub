import { getValidationSchema } from '../../../../../framework/validation/index';
import {
  passwordValidation,
  passwordRepeatValidation,
  emailValidation,
} from '../../../../../framework/validation/fields-rules';

export default getValidationSchema({
  email: emailValidation,
  password: passwordValidation,
  passwordRepeat: passwordRepeatValidation,
});
