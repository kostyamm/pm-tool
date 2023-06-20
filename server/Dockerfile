FROM node:16-alpine

WORKDIR /server

COPY package*.json ./
RUN npm ci

COPY . .

ENV PORT 8000

EXPOSE $PORT

CMD [ "npm", "start" ]
