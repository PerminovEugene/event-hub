// TODO remove ugly
export const getServerErrorData = (response: any) => response.graphQLErrors[0].message.message;
