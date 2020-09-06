import { RegistrationInput } from '@event-hub/shared';

export const mutationRegistration = (input: RegistrationInput) => ({
  operationName: 'registration',
  variables: {
    registrationInput: input,
  },
  query: `mutation registration($registrationInput: RegistrationInput!) {
              registration(registrationInput: $registrationInput) {
                email
                role id
                status
              }
            }`,
});
