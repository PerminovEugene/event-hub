"use strict";
exports.__esModule = true;
var graphql_1 = require("@nestjs/graphql");
var path_1 = require("path");
var myArgs = process.argv.slice(2);
console.log('Possible arguments: --watch');
// TODO use graphql config
var definitionsFactory = new graphql_1.GraphQLDefinitionsFactory();
definitionsFactory.generate({
    typePaths: ['./src/**/*.graphql'],
    path: path_1.join(__dirname, '../../../shared/transport/graphql.definitions.ts'),
    outputAs: 'class',
    watch: myArgs.findIndex(function (arg) { return arg === '--watch'; }) !== -1
});
