import { RegistrationInput } from '@calendar/shared';

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
