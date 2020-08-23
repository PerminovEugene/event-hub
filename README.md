# Event-hub

Simple events search and managment.

## Project uses monorepo strategy

- `api-server` is main backend server with business logic.
- `shared` contais data shared between other repos. Includes autogenerated typings from `api-server` repo.
- `front-end` is project web UI.

## Local setup

1. install lerna
2. build `shared` project
3. `$ npm run bootstrap`

## Lerna tips

1. `lerna version --conventional-commits`

## TODO

1. Clarify what is working ad what is not
2. Make possibility to easy build and start locally all infrastucture
3. Setup db
4. Setup prometheus
5. Update packages versions

6. Delete .env from api server repos
-----------------------------------------