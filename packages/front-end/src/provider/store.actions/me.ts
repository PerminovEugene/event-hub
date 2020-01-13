import { SessionData, Role } from '@calendar/shared';

export const createMe = (user?: SessionData) => ({
  me: {
    __typename: 'Me',
    role: user ? user.role : Role.guest,
    user_id: user ? user.id : null,
    email: user ? user.email : null,
    status: user ? user.status : null,
  },
});
