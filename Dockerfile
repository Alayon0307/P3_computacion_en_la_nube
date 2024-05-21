FROM node:20.13.1

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]