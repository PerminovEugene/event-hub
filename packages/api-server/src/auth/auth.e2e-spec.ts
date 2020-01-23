import { LoginInput, RegistrationInput, Role } from '@calendar/shared';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Connection, getConnection } from 'typeorm';
import { AppUser, Status } from '../app-user/app-user.entity';
import { getGraphqlConfig } from '../config/app/graphql.config';
import { initConfigService } from '../config/environment/service';
import { AppType, Director } from '../core/app/app.director';
import { TestE2eAppBuilder } from '../core/app/teste2e.app.builder';
import { generateSalt, hashText } from '../facades/crypto';
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

  it('should make positive login request', async () => {
    const email = 'logintest@mail.com',
      sourcePassword = 'foobarbazz',
      salt = await generateSalt(),
      role = Role.client,
      status = Status.active,
      password = await hashText(sourcePassword, salt);

    const result = await connection
      .createQueryBuilder()
      .insert()
      .into(AppUser)
      .values([{ email, password, salt, status, role }])
      .execute();

    const loginInput: LoginInput = { email, password: sourcePassword };
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
                role id
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
      email,
      role,
      id,
      status,
      __typename: 'SessionData',
    });
  });

  it('should make positive registration request', async () => {
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
  });

  afterAll(async () => {
    await app.close();
  });
});
