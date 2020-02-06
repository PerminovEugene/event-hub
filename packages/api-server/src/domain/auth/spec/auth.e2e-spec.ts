import { LoginInput, RegistrationInput, Role } from '@calendar/shared';
import { INestApplication } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { testRequest } from '../../../facades/tests';
import { e2eSpecInitalizer } from '../../../framework/test/e2e/e2e.uitls';
import { AppUser, Status } from '../../app-user/app-user.entity';
import { defineAppUser } from '../../app-user/app-user.factory';
import { AuthModule } from './../auth.module';
import { passportLocalAuthConfig } from './../configurations/passport-local.configuration';
import { mutationRegistration } from './auth.requests';

// TODO move general things to another file

describe('Auth e2e', () => {
  let app: INestApplication;
  let connection: Connection;
  let appUserRepository: Repository<AppUser>;

  beforeAll(async () => {
    ({ app, connection } = await e2eSpecInitalizer({
      importedModules: [AuthModule.forRoot(passportLocalAuthConfig)],
    }));
    appUserRepository = connection.getRepository(AppUser);
  });

  describe('Login', () => {
    it('When email and password are correct, then returns user data and cookie', async () => {
      const appUser = await defineAppUser({ email: 'login-positive@mail.com' });
      const result = await appUserRepository.insert(appUser);
      const id = result.raw[0].id;
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
      expect(res.body.data.login).toEqual({
        email: appUser.email,
        role: appUser.role,
        id: id,
        status: appUser.status,
      });

      await appUserRepository.delete(id);
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
        params: mutationRegistration(registrationInput),
        status: 200,
      });

      expect(err).not.toBeDefined();
      const appUserRecord = await appUserRepository.findOne({
        where: { email },
      });
      expect(res.body.data.registration).toEqual({
        email,
        role,
        id: appUserRecord.id,
        status,
      });
      expect(res.headers['set-cookie'][0]).toBeDefined();

      await appUserRepository.delete(appUserRecord.id);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
