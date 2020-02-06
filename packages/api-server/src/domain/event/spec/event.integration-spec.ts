import {
  Connection,
  createConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { initConfigService } from '../../../config/environment/service';
import { defineTag } from '../../tag/spec/tag.factory';
import { Tag } from '../../tag/tag.entity';
import { TagEntityCreationError } from '../../tag/tag.errors';
import { getConnectionOptions } from './../../../database/database.provider';
import { TagService } from './../../tag/tag.service';
import { Event } from './../event.entity';
import { EventService } from './../event.service';
import { defineEvent, defineEventWithTags } from './event.factory';

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

      const eventEntity = await eventService.create(event);

      const eventRecord = await eventRepository.findOne(eventEntity.id);
      expect(eventEntity).toEqual(eventRecord);

      await eventRepository.delete(eventRecord.id);
    });

    it('When event has only new tags, then return inserted record with tags', async () => {
      const event = await defineEventWithTags();

      const eventEntity = await eventService.create(event);

      const eventRecordWithTags = await eventRepository.findOne(
        eventEntity.id,
        {
          relations: ['tags'],
        },
      );
      expect(eventEntity).toEqual(eventRecordWithTags);

      await eventRepository.delete(eventRecordWithTags.id);
      await tagRepository.delete(eventRecordWithTags.tags.map(tag => tag.id));
    });

    it('When event has only existed tags, then return inserted record with tags ids', async () => {
      const existedTags = (
        await tagRepository.insert([await defineTag(), await defineTag()])
      ).raw;
      const event = await defineEvent();
      event.tags = existedTags.map(tag => ({ id: tag.id }));

      const eventEntity = await eventService.create(event);

      const eventRecord = await eventRepository.findOne(eventEntity.id, {
        relations: ['tags'],
      });
      // result tags wouldn't include name, if it wasn't send
      eventRecord.tags.forEach((tag, index) => {
        expect(tag.id).toEqual(eventEntity.tags[index].id);
      });
      delete eventRecord.tags;
      delete eventEntity.tags;
      expect(eventEntity).toEqual(eventRecord);

      await eventRepository.delete(eventRecord.id);
      await tagRepository.delete(existedTags.map(tag => tag.id));
    });

    it('When event has new and existed tags, then return inserted record with tags', async () => {
      const existedTags = (
        await tagRepository.insert([await defineTag(), await defineTag()])
      ).raw;
      const event = await defineEvent();
      event.tags = existedTags.map(tag => ({ id: tag.id }));
      event.tags.push(await defineTag(), await defineTag());

      const eventEntity = await eventService.create(event);

      const eventRecordWithTags = await eventRepository.findOne(
        eventEntity.id,
        {
          relations: ['tags'],
        },
      );
      expect(eventRecordWithTags.tags.length).toEqual(eventEntity.tags.length);
      eventRecordWithTags.tags.forEach((tag, index) => {
        expect(tag.id).toEqual(eventEntity.tags[index].id);
      });
      const tagsIds = eventRecordWithTags.tags.map(tag => tag.id);
      delete eventRecordWithTags.tags;
      delete eventEntity.tags;
      expect(eventEntity).toEqual(eventRecordWithTags);

      await eventRepository.delete(eventRecordWithTags.id);
      await tagRepository.delete(tagsIds);
    });

    it('When event has existed tag with id and name, then throws error', async () => {
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
      } finally {
        tagRepository.delete(existedTags.map(tag => tag.id));
      }
    });

    it('When event has existed tag with id and new name, then throws error', async () => {
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
      } finally {
        await tagRepository.delete(existedTags.map(tag => tag.id));
      }
    });
  });

  afterAll(async () => {
    await connection.close();
  });
});
