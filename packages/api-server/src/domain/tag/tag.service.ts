import { TagInput, TagsFiltersInput } from '@event-hub/shared';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SaveTagError } from '../../errors/tag.errors';
import { Tag as TagEntity } from './tag.entity';
import { TagEntityCreationError } from './tag.errors';

@Injectable()
export class TagService {
  constructor(
    @Inject('TAG_REPOSITORY')
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  public async getTags(filters?: TagsFiltersInput) {
    return this.tagRepository.find();
  }

  public async getTag(id: number) {
    return this.tagRepository.findOne(id);
  }

  public async create(tagDTO: TagInput): Promise<TagEntity> {
    const tag: TagEntity = this.createTagEntity(tagDTO);
    console.log(tag, tagDTO);
    await tag.validate();
    return await this.saveTagEntity(tag);
  }

  public async findByIds(ids: Array<number>) {
    debugger;
    return await this.tagRepository.findByIds(ids);
  }

  public async findByEventsIds(eventsIds) {
    try {
      // const result = await this.tagRepository.find({
      //   // where: { eventId: eventsIds },
      //   relations: ['events'],
      //   where: { 'tag.events.id': In(eventsIds) },
      //   // order: { createDate: "ASC" },
      // });
      const result = await this.tagRepository
        .createQueryBuilder('tag')
        .leftJoinAndSelect('tag.events', 'events')
        .where('events.id IN (:...ids)', { ids: eventsIds })
        .getMany();

      // tagService
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // public async update(event: EventUpdateInput): Promise<EventEntity> {
  //   let eventRecord = await this.eventRepository.findOne(event.id);
  //   // TODO refactoring tricky date update
  //   Object.assign(eventRecord, event, { date: new Date(event.date) });
  //   await eventRecord.validate();
  //   await this.eventRepository.save(eventRecord);
  //   return eventRecord;
  // }

  // TODO move it to factory or something like that?
  public createTagEntity(tagDTO: TagInput): TagEntity {
    try {
      if (tagDTO.name && tagDTO.id) {
        throw new TagEntityCreationError(
          "New tag couldn't contain id and name",
        );
      }
      const tag: TagEntity = this.tagRepository.create(tagDTO);
      return tag;
    } catch (e) {
      throw e;
    }
  }

  protected async saveTagEntity(tagEntity: TagEntity): Promise<TagEntity> {
    try {
      return await this.tagRepository.save(tagEntity);
    } catch (e) {
      throw new SaveTagError(e);
    }
  }
}
