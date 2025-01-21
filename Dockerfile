FROM node:lts-alpine

COPY ./src /src

COPY ./package.json /package.json

RUN npm run start:prod

CMD node index.js