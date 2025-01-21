FROM node:lts-alpine

COPY ./src /src

COPY ./package.json /package.json

COPY ./swagger /swagger

RUN npm run start

CMD node index.js