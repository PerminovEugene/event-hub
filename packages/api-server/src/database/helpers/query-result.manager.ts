import { InsertResult } from 'typeorm';

export const getInsertResult = (insertResult: InsertResult): any =>
  insertResult.raw[0];
