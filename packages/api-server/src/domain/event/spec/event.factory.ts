import * as faker from 'faker';
import { defineTag } from '../../tag/spec/tag.factory';
import { EventType } from './../event.entity';

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

export const defineEvents = async (
  numberOfEvents: number = 5,
): Promise<any> => {
  const events = [];
  for (let i = 0; i < numberOfEvents; i++) {
    const event = await defineEvent();
    events.push(event);
  }
  return events;
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

export const defineEventsWithTags = async (numberOfEvents: number = 5) => {
  const events = [];
  for (let i = 0; i < numberOfEvents; i++) {
    const event = await defineEventWithTags();
    events.push(event);
  }
  return events;
};
