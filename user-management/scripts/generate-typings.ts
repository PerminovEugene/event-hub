import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const myArgs = process.argv.slice(2);
console.log('Possible arguments: --watch');

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class',
  watch: myArgs.findIndex((arg: string) => arg === '--watch') !== -1,
});
