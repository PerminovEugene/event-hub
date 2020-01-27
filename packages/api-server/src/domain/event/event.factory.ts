import * as faker from 'faker';
import { EventType } from './event.entity';

type OverridenFields = {
  name?: string;
  type?: EventType;
  description?: string;
  date?: Date;
};

export const defineEvent = async (overridenFields: OverridenFields = {}) => {
  return {
    name: overridenFields.name || faker.lorem.sentence(),
    type: overridenFields.type || EventType.meetup,
    description: overridenFields.description || faker.lorem.text(),
    date:
      overridenFields.date || faker.date.between('01.01.2000', '01.01.2030'),
  };
};
