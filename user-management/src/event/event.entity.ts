import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Type {
  conference = 'conference',
  meetup = 'meetup',
  workshop = 'workshop',
  podcast = 'podcast',
  video = 'video',
  article = 'article',
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  type: Type;

  @Column('date')
  date: Date;
}
