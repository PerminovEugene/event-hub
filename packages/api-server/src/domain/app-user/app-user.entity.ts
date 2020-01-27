import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

export enum Status {
  active = 'active',
  banned = 'banned',
}

@Unique(['email'])
@Entity()
export class AppUser {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  @Column('text')
  email: string;

  @IsNotEmpty()
  @Column('text')
  password: string;

  @IsNotEmpty()
  @Column('text')
  salt: string;

  @IsNotEmpty()
  @Column('text')
  role: string;

  @IsNotEmpty()
  @Column('text')
  status: Status;
}
