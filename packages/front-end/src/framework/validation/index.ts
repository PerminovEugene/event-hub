import * as yup from 'yup';

export const getValidationSchema = (shape: any) => {
  return yup.object().shape(shape);
};
