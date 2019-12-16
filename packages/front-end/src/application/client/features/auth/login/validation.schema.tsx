import { getValidationSchema } from '../../../../../framework/validation/index';
import { passwordValidation, emailValidation } from '../../../../../framework/validation/fields-rules';

export default getValidationSchema({
  email: emailValidation,
  password: passwordValidation,
});
