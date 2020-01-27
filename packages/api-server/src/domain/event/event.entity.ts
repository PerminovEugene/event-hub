import { IsDate, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../core/base.entity';
import { Tag } from '../tag/tag.entity';

// TODO Move to db
export enum EventType {
  conference = 'conference',
  meetup = 'meetup',
  workshop = 'workshop',
  podcast = 'podcast',
  video = 'video',
  article = 'article',
}

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column('text')
  name: string;

  @IsString()
  @Column('text')
  description: string;

  @Column('text')
  type: EventType;

  @IsDate({
    message: 'Invalid date',
  })
  @Column('date')
  date: Date;

  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];
}
