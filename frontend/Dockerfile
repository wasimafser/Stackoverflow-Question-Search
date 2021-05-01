FROM node:16

WORKDIR /app/frontend

COPY package.json yarn.lock /app/frontend/

RUN npm install

ENV PATH="/app/frontend/node_modules/.bin:$PATH"

COPY . /app/frontend/

EXPOSE 3000
