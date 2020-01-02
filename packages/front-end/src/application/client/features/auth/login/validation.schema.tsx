import { getValidationSchema } from '../../../../../framework/validation/index';
import { passwordValidation, emailValidation } from '../../../../../framework/validation/fields-rules';

const getLoginValidationSchema = () =>
  getValidationSchema({
    email: emailValidation,
    password: passwordValidation,
  });

export default getLoginValidationSchema;
