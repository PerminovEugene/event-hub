import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';

export type TestRequest = {
  app: INestApplication;
  params: {
    operationName?: string;
    variables?: any;
    query: any;
  };
  status: number;
};

export const testRequest = ({
  app,
  params,
  status,
}: TestRequest): Promise<{ err: any; res: any }> => {
  return new Promise((resolve, reject) => {
    try {
      supertest(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: params.operationName,
          variables: params.variables,
          query: params.query,
        })
        .expect(status)
        .end((err, res) => {
          resolve({ err, res });
        });
    } catch (e) {
      reject(e);
    }
  });
};
