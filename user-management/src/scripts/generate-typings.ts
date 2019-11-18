import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const myArgs = process.argv.slice(2);
console.log('Possible arguments: --watch');

// TODO use graphql config
const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(__dirname, '../../../shared/transport/graphql.definitions.ts'),
  outputAs: 'class',
  watch: myArgs.findIndex((arg: string) => arg === '--watch') !== -1,
});
