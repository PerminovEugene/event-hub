import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Status {
  active = 'active',
  banned = 'banned',
}

@Entity()
export class AppUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  salt: string;

  @Column('text')
  role: string;

  @Column('text')
  status: Status;
}
