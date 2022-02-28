FROM node:16.14.0-stretch-slim

WORKDIR /goof/src

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=dev

EXPOSE 80

RUN ./startup.sh

RUN ["node", "app.js"]
