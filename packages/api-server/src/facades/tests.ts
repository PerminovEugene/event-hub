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
  cookies?: string[];
};

export const testRequest = ({
  app,
  params,
  status,
  cookies = [],
}: TestRequest): Promise<{ err: any; res: any }> => {
  return new Promise((resolve, reject) => {
    try {
      supertest(app.getHttpServer())
        .post('/graphql')
        .set('Cookie', cookies)
        .send({
          operationName: params.operationName,
          variables: params.variables,
          query: params.query,
        })
        .expect(status)
        .end((err, res) => {
          resolve({ err: err || res.body.errors, res });
        });
    } catch (e) {
      reject(e);
    }
  });
};
