import { LoginInput, RegistrationInput, Role } from '@calendar/shared';
import { INestApplication } from '@nestjs/common';
import { Connection } from 'typeorm';
import { testRequest } from '../../facades/tests';
import { e2eSpecInitalizer } from '../../framework/test/e2e/e2e.uitls';
import { AppUser, Status } from '../app-user/app-user.entity';
import { defineAppUser } from '../app-user/app-user.factory';
import { AuthModule } from './auth.module';

// TODO move general things to another file

describe('Auth e2e', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    ({ app, connection } = await e2eSpecInitalizer({
      importedModules: [AuthModule],
    }));
  });

  describe('Login', () => {
    it('When email and password are correct, then returns user data and cookie', async () => {
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
              }
            }`,
        },
        status: 200,
      });
      expect(err).not.toBeDefined();

      const id = result.raw[0].id;
      await connection
        .createQueryBuilder()
        .delete()
        .from(AppUser)
        .where('id = :id', { id })
        .execute();
      expect(res.body.data.login).toEqual({
        email: appUser.email,
        role: appUser.role,
        id,
        status: appUser.status,
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

      expect(err).not.toBeDefined();

      const result = await connection
        .createQueryBuilder()
        .select('app_user')
        .from(AppUser, 'app_user')
        .where('app_user.email = :email', { email })
        .getOne();

      await connection
        .createQueryBuilder()
        .delete()
        .from(AppUser)
        .where('id = :id', { id: result.id })
        .execute();

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
