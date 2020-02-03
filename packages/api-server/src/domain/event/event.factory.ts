import * as faker from 'faker';
import { defineTag } from '../tag/tag.factory';
import { EventType } from './event.entity';

type OverridenFields = {
  name?: string;
  type?: EventType;
  description?: string;
  date?: Date;
  tags?: Array<{
    id: number;
    name: string;
  }>;
};

export const defineEvent = async (
  overridenFields: OverridenFields = {},
): Promise<any> => {
  return {
    name: overridenFields.name || faker.lorem.sentence(),
    type: overridenFields.type || EventType.meetup,
    description: overridenFields.description || faker.lorem.text(),
    date:
      overridenFields.date || faker.date.between('01.01.2000', '01.01.2030'),
  };
};

export const defineEventWithTags = async (
  overridenFields: OverridenFields = {},
) => {
  const event = await defineEvent(overridenFields);
  if (overridenFields.tags) {
    event.tags = overridenFields.tags;
  } else {
    event.tags = [];
    // TODO
    for (let i = 0; i < 5; i++) {
      event.tags.push(await defineTag());
    }
  }
  return event;
};
