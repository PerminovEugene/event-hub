import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import * as supertest from 'supertest';
import { getGraphqlConfig } from '../config/app/graphql.config';
import { EnvField, initConfigService } from '../config/environment/service';
import { AuthModule } from './auth.module';

describe('Auth e2e', () => {
  let app: INestApplication;

  beforeAll(async done => {
    const config = initConfigService({ filePrefix: 'test-e2e' });
    const moduleFixture = await Test.createTestingModule({
      imports: [
        AuthModule,
        GraphQLModule.forRootAsync({
          useFactory: () => getGraphqlConfig(),
        }),
      ],
    }).compile();
    app = moduleFixture.createNestApplication();

    app.use(cookieParser());
    // app.useGlobalFilters(new AllExceptionsFilter());

    app.use(
      session({
        // store: new RedisStore({client: redisClient}),
        secret: config.get(EnvField.COOKIE_SECRET),
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
          maxAge: 10 * 60 * 1000,
          httpOnly: false,
        },
      }),
    );

    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
    done();
  });

  it('should send login input', async done => {
    supertest(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: 'login',
        variables: {
          loginInput: { email: 'client@mail.com', password: 'qwerty' },
        },
        query: `mutation login($loginInput: LoginInput!) {
              login(loginInput: $loginInput) {
                email
                role id
                status
                __typename
              }
            }`,
      })
      .expect(200)
      .end(function(err, res) {
        const error = err || res.body.errors;
        if (error) return done(error);
        expect(res.body.data.login).toEqual({
          email: 'client@mail.com',
          role: 'client',
          id: 67,
          status: 'active',
          __typename: 'SessionData',
        });
        done();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
