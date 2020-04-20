FROM node:10.15.3-alpine as build
WORKDIR /usr/src/app
# Copy and install deps first to cache
COPY package*.json ./
RUN npm install


FROM alpine

WORKDIR /usr/src/app
# Lightest way to have node in alpine
RUN apk add --update nodejs

COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY src .
CMD [ "node", "/usr/src/app" ]