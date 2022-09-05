FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

RUN npm config set fetch-retry-maxtimeout 420000

COPY package.json package-lock.json ./

RUN npm i

RUN npm i -g @nestjs/cli

RUN npm ci

COPY . ./

# for dev
RUN nest build sms-scheduler

# RUN nest start sms-scheduler

EXPOSE 3000
