// TODO remove ugly
// also we have to handle not only base error, example: response.graphQLErrors[0].message.date;
export const getServerErrorData = (response: any) => response.graphQLErrors[0].message.message;
