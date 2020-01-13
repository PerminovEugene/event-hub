import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const myArgs = process.argv.slice(2);
console.log('Possible arguments: --watch');

const definitionsFactory = new GraphQLDefinitionsFactory();

const placeToSave = join(
  __dirname,
  '../../../shared/src/transport/graphql.definitions.ts',
);

definitionsFactory
  .generate({
    typePaths: ['./src/**/*.graphql'],
    path: placeToSave,
    outputAs: 'class',
    watch: myArgs.findIndex((arg: string) => arg === '--watch') !== -1,
  })
  .then(() => {
    console.log(`Definitions were saved in ${placeToSave}`);
  });
