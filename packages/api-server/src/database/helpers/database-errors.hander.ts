import { QueryFailedError } from 'typeorm';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseError } from '../../errors/database.errors';

type DbError = QueryFailedError & any;

export const wrapDbError = (e: DbError, parameters: any) => {
  if (e.code === ERROR_CODES.DUBLICATE_UNIQ_VALUE) {
    return new DatabaseError(
      null,
      e,
      new BadRequestException(
        `User with email ${parameters.email} already exists`,
      ),
    );
  }
  //   TODO log unhandled error
  return new DatabaseError(null, e, new InternalServerErrorException());
};

const enum ERROR_CODES {
  DUBLICATE_UNIQ_VALUE = '23505',
}
