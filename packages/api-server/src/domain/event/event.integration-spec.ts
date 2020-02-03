import {
  Connection,
  createConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { initConfigService } from '../../config/environment/service';
import { Tag } from '../tag/tag.entity';
import { TagEntityCreationError } from '../tag/tag.errors';
import { defineTag } from '../tag/tag.factory';
import { getConnectionOptions } from './../../database/database.provider';
import { TagService } from './../tag/tag.service';
import { Event } from './event.entity';
import { defineEvent, defineEventWithTags } from './event.factory';
import { EventService } from './event.service';

describe('Event Service Integration', () => {
  let eventService: EventService;
  let tagRepository: Repository<Tag>;
  let eventRepository: Repository<Event>;
  let connection: Connection;

  beforeAll(async () => {
    jest.setTimeout(60000);
    initConfigService({ filePrefix: 'test-integration' });
    connection = await createConnection(getConnectionOptions());
    tagRepository = getRepository(Tag);
    const tagService = new TagService(tagRepository);
    eventRepository = getRepository(Event);
    eventService = new EventService(eventRepository, tagService);
  });

  describe('create', () => {
    it('When event has no tags, then return inserted record', async () => {
      const event = await defineEvent();
      const result = await eventService.create(event);
      const record = await eventRepository.findOne(result.id);
      expect(result).toEqual(record);
    });

    it('When event has only new tags, then return inserted record with tags', async () => {
      const event = await defineEventWithTags();
      const result = await eventService.create(event);
      const record = await eventRepository.findOne(result.id, {
        relations: ['tags'],
      });
      expect(result).toEqual(record);
    });

    it('When event has only existed tags, then return inserted record with tags ids', async () => {
      const existedTags = (
        await tagRepository.insert([await defineTag(), await defineTag()])
      ).raw;
      const event = await defineEvent();
      event.tags = existedTags.map(tag => ({ id: tag.id }));
      const result = await eventService.create(event);
      const record = await eventRepository.findOne(result.id, {
        relations: ['tags'],
      });
      // result tags wouldn't include name, if it wasn't send
      record.tags.forEach((tag, index) => {
        expect(tag.id).toEqual(result.tags[index].id);
      });
      delete record.tags;
      delete result.tags;
      expect(result).toEqual(record);
    });

    it('When event has new and existed tags, then return inserted record with tags', async () => {
      const existedTags = (
        await tagRepository.insert([await defineTag(), await defineTag()])
      ).raw;
      const event = await defineEvent();
      event.tags = existedTags.map(tag => ({ id: tag.id }));
      event.tags.push(await defineTag(), await defineTag());

      const result = await eventService.create(event);
      const record = await eventRepository.findOne(result.id, {
        relations: ['tags'],
      });
      expect(record.tags.length).toEqual(result.tags.length);
      record.tags.forEach((tag, index) => {
        expect(tag.id).toEqual(result.tags[index].id);
      });
      delete record.tags;
      delete result.tags;
      expect(result).toEqual(record);
    });

    it('When event has existed tag with right name, then throws error', async () => {
      const definedTags = [await defineTag(), await defineTag()];
      const existedTags = (await tagRepository.insert(definedTags)).raw;
      const event = await defineEvent();
      event.tags = existedTags.map((tag, index) => ({
        id: tag.id,
        name: definedTags[index].name,
      }));
      try {
        await eventService.create(event);
        fail(
          'Event creation should throw error, because of tags have id and name',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(TagEntityCreationError);
      }
    });

    it('When event has existed tag with wrong name, then throws error', async () => {
      const definedTags = [await defineTag(), await defineTag()];
      const existedTags = (await tagRepository.insert(definedTags)).raw;
      const event = await defineEvent();
      event.tags = existedTags.map((tag, index) => ({
        id: tag.id,
        name: `WRONG-${definedTags[index].name}`,
      }));

      try {
        await eventService.create(event);
        fail(
          'Event creation should throw error, because of tags have id and name',
        );
      } catch (e) {
        expect(e).toBeInstanceOf(TagEntityCreationError);
      }
    });
  });

  afterAll(async () => {
    await connection.close();
  });
});
