import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../core/base.entity';
import { IsOptional, IsString, IsDate } from 'class-validator';

export enum Type {
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

  @IsOptional()
  @IsString()
  @Column('text')
  description: string;

  @Column('text')
  type: Type;

  // TODO wrap decorators with default messages
  @IsDate({
    message: 'Invalid date',
  })
  @Column('date')
  date: Date;
}
