import { LoginInput, RegistrationInput, Role } from '@calendar/shared';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Connection, getConnection } from 'typeorm';
import { AppUser, Status } from '../app-user/app-user.entity';
import { defineAppUser } from '../app-user/app-user.factory';
import { getGraphqlConfig } from '../config/app/graphql.config';
import { initConfigService } from '../config/environment/service';
import { AppType, Director } from '../core/app/app.director';
import { TestE2eAppBuilder } from '../core/app/teste2e.app.builder';
import { testRequest } from '../facades/tests';
import { AuthModule } from './auth.module';

// TODO move general things to another file

describe('Auth e2e', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    jest.setTimeout(300000);
    initConfigService({ filePrefix: 'test-e2e' });
    const builder = new TestE2eAppBuilder({
      imports: [
        AuthModule,
        GraphQLModule.forRootAsync({
          useFactory: () => getGraphqlConfig(),
        }),
      ],
    });
    const director = new Director(builder);
    await director.make(AppType.testE2e);
    app = builder.getApp();
    await app.init();
    connection = getConnection('default');
  });

  describe('Login', () => {
    it('When no email and password are correct, then returns user data and cookie', async () => {
      const appUser = await defineAppUser({ email: 'login-positive@mail.com' });

      const result = await connection
        .createQueryBuilder()
        .insert()
        .into(AppUser)
        .values([appUser])
        .execute();

      const loginInput: LoginInput = {
        email: appUser.email,
        password: appUser.sourcePassword,
      };
      const { err, res } = await testRequest({
        app,
        params: {
          operationName: 'login',
          variables: {
            loginInput,
          },
          query: `mutation login($loginInput: LoginInput!) {
              login(loginInput: $loginInput) {
                email
                role
                id
                status
                __typename
              }
            }`,
        },
        status: 200,
      });

      const error = err || res.body.errors;
      const id = result.raw[0].id;
      await connection
        .createQueryBuilder()
        .delete()
        .from(AppUser)
        .where('id = :id', { id })
        .execute();
      expect(error).not.toBeDefined();
      expect(res.body.data.login).toEqual({
        email: appUser.email,
        role: appUser.role,
        id,
        status: appUser.status,
        __typename: 'SessionData',
      });
    });
  });

  describe('Registration', () => {
    it('When email, password and passwordConfirm are correct, then user is created and returned, response has correct cookie', async () => {
      const email = 'registrationtest@mail.com',
        sourcePassword = 'regpassword',
        role = Role.client,
        status = Status.active;

      const registrationInput: RegistrationInput = {
        email,
        password: sourcePassword,
        passwordConfirm: sourcePassword,
      };
      const { err, res } = await testRequest({
        app,
        params: {
          operationName: 'registration',
          variables: {
            registrationInput,
          },
          query: `mutation registration($registrationInput: RegistrationInput!) {
                  registration(registrationInput: $registrationInput) {
                    email
                    role id
                    status
                    __typename
                  }
                }`,
        },
        status: 200,
      });

      const error = err || res.body.errors;
      expect(error).not.toBeDefined();

      const result = await connection
        .createQueryBuilder()
        .select('app_user')
        .from(AppUser, 'app_user')
        .where('app_user.email = :email', { email })
        .getOne();
      expect(res.body.data.registration).toEqual({
        email,
        role,
        id: result.id,
        status,
        __typename: 'SessionData',
      });
      expect(res.headers['set-cookie'][0]).toBeDefined();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
