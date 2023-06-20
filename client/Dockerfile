FROM node:16-alpine

WORKDIR /client

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV PORT 3000

EXPOSE $PORT

CMD [ "npm", "run", "preview" ]
