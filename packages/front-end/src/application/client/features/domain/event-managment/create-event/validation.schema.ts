import { getValidationSchema } from '../../../../../../framework/validation/index';
import {
  eventNameValidation,
  eventDescriptionValidation,
  eventTypeValidation,
} from '../../../../../../framework/validation/fields-rules';

const getEventValidationSchema = () =>
  getValidationSchema({
    name: eventNameValidation,
    description: eventDescriptionValidation,
    type: eventTypeValidation,
  });

export default getEventValidationSchema;
