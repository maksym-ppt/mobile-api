FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache --virtual python

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

CMD npm run dev