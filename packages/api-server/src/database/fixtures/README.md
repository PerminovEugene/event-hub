# Fixtures

## How it works

1. Executor script collects fixtures data from /entities/\*/fixtures.yaml
2. Executor makes instances of services for each entity
3. Executor inserting new data

## How to insert data

1. `ts-node src/database/fixtures/executor.ts` from root dirrectory

## How TO add new fixtures for new entity

1. make new dirrectory in ./entities with 2 files 'fixtures.yaml' and 'NEW_ENTITY_NAME.ts'
2. fill fixtures.yaml
3. type code for new service manager
