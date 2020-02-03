import { IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from '../../core/base.entity';
import { Event } from '../event/event.entity';

@Unique(['name'])
@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column('text')
  name: string;

  @ManyToMany(
    type => Event,
    event => event.tags,
  )
  events: Event[];
}
