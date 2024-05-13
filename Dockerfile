FROM node:20.13.1

WORKDIR /api

COPY . .

RUN node api.js

EXPOSE  3001

CMD ["npm","start"]