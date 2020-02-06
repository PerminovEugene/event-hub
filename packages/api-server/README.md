# Api-server

### Setup development

1. Create new files in `env` dirrectory - `.env`, `test-e2e.env` and `test-integration.env` in the same dirrectory
2. fill these files by example in .env.template

### Migrations

When you update entities you need to create migration and run them

1.  npm run typeorm migration:generate -- -n migrationYOUR_MIGRATION_NAME
2.  npm run typeorm migration:run

### How to update graphql defenitions

1. `npm run generate:gql:defenitions` they will be stored in shared repository
2. rebuild shared repository. In local development you do not need to reinstall shared repository in node_modules, because lerna uses symlinks

### Hints

1. If you want to add new entity with resolver, don't forget add module in Graphql Config in /`config/app/graphql.config.ts`
2. Use snippets and don't forget to add new

### Issues

1. Nest.js validation problem will solving in next major release https://github.com/nestjs/nest/pull/3053
2. Typeorm has 1300 issues :| need to research for another ORM

### TODO

1. edit event with tags
2. true deletion or archivations for events
3. guards for events\tags actions,
4. e2e integration for AUTH module
