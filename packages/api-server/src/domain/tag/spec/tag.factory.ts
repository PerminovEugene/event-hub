import * as faker from 'faker';

type OverridenFields = {
  id?: number;
  name?: string;
};

let counter = 0;
export const defineTag = async (
  overridenFields: OverridenFields = {},
): Promise<any> => {
  counter += 1;
  return {
    id: overridenFields.id,
    name: overridenFields.name || `${faker.random.word()}-${counter}`,
  };
};
