FROM node:16.17.0-alpine as node_base

RUN apk update

WORKDIR /home/node

RUN chown -R 1000:1000 /home/node

# dev
FROM node_base as development

COPY ./app/package.json ./
COPY ./app/package-lock.json ./

RUN npm install --force