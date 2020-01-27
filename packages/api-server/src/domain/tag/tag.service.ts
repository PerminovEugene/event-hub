import { TagInput, TagsFiltersInput } from '@calendar/shared';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SaveTagError } from '../../errors/tag.errors';
import { Tag as TagEntity } from './tag.entity';

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

  // public async update(event: EventUpdateInput): Promise<EventEntity> {
  //   let eventRecord = await this.eventRepository.findOne(event.id);
  //   // TODO refactoring tricky date update
  //   Object.assign(eventRecord, event, { date: new Date(event.date) });
  //   await eventRecord.validate();
  //   await this.eventRepository.save(eventRecord);
  //   return eventRecord;
  // }

  // TODO move it to factory or something like that?
  protected createTagEntity(tagDTO: TagInput): TagEntity {
    try {
      const tag: TagEntity = new TagEntity();
      Object.assign(tag, tagDTO);
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
