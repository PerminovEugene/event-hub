# Api-server

### Setup development

1. Create new files in `env` dirrectory - `.env`, `test-e2e.env` and `test-integration.env` in the same dirrectory
2. fill these files by example in .env.template

### For regeneration graphql typings

(they are stored in shared repo)

1. go to src/scripts
2. `$ ts-node ./generate-graphql-typings.ts`

### Hints

1. If you want to add new entity with resolver, don't forget add module in Graphql Config in /`config/app/graphql.config.ts`
2. Use snippets and add new

### Issues

1. Nest.js validation problem will solving in next major release https://github.com/nestjs/nest/pull/3053

### TODO

1. edit event with tags
2. true deletion or archivations for events
3. guards for events\tags actions,
4. e2e integration for AUTH module
