import { Role } from '@calendar/shared';
import { generateSalt, hashText } from '../facades/crypto';
import { Status } from './app-user.entity';

type OverridenFields = {
  sourcePassword?: string;
  email?: string;
  status?: Status;
  role?: Role;
};

export const defineAppUser = async (overridenFields: OverridenFields = {}) => {
  const sourcePassword = overridenFields.sourcePassword || 'foobarbazz',
    salt = await generateSalt(),
    password = await hashText(sourcePassword, salt);
  return {
    email: overridenFields.email || 'logintest@mail.com',
    password,
    salt,
    status: overridenFields.status || Status.active,
    role: overridenFields.role || Role.client,
    sourcePassword: sourcePassword,
  };
};
