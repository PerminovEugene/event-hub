FROM node:12.13.0
WORKDIR /usr/src/app
# COPY package*.json ./

COPY package.json .
COPY nest-cli.json .
COPY tsconfig.prod.json .

RUN npm install --only=prod

COPY src ./src

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# EXPOSE 8080

RUN npm run build:prod
RUN ls

# if you want to delete src folder for memory econonmy - don't forget copy entities manually n container  
# RUN rm -rf src

CMD [ "npm", "run", "start:prod"]