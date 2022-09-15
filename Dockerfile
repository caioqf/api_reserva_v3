FROM node:17-alpine as node_base

RUN apk update

WORKDIR /home

RUN chown -R 1000:1000 /home/node

# dev
FROM node_base as development

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --legacy-peer-deps