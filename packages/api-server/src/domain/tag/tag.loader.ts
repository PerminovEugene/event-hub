import { TagInput } from '@calendar/shared';
import { Injectable } from '@nestjs/common';
import { TagService } from './tag.service';
import DataLoader = require('dataloader'); // commonjs module

export interface IDataLoader<K, V> {
  load(id: K): Promise<V>;
}

@Injectable()
export class TagDataLoader implements IDataLoader<number, TagInput> {
  constructor(private readonly dataLoader: DataLoader<any, any>) {}

  public static async create(tagService: TagService): Promise<TagDataLoader> {
    const dataloader = new DataLoader<string, TagInput>(
      async (eventsIds: any) => {
        let tags = await tagService.findByEventsIds(eventsIds);
        return eventsIds.map(eventId =>
          tags.filter(tag =>
            tag.events.find(tagEvent => tagEvent.id === eventId),
          ),
        );
      },
    );
    return new TagDataLoader(dataloader);
  }
  public async load(id: number) {
    return this.dataLoader.load(id);
  }
}
