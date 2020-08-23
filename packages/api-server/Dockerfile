FROM node:12.13.0
WORKDIR /usr/src/app

COPY package.json .
COPY nest-cli.json .
COPY tsconfig.prod.json .
COPY ormconfig.ts .
COPY src ./src

# This cheat need because typeorm migrations expect tsconfig file and
# I didn't find way how to scpecify tsconfing custom name
COPY tsconfig.prod.json ./tsconfig.json

RUN npm install --only=prod

RUN npm run build:prod

# if you want to delete src folder for the memory econonomy -
# don't forget copy entities manually into container  
# RUN rm -rf src

# we have to run migratons there because we need env variables for access to db\
CMD [ "npm", "run", "start:prod"]
# CMD [ "npm", "run", "typeorm", migration:run &&", "npm", "run", "start:prod"]
# CMD npm run typeorm migration:run