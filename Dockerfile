FROM node:18.8.0-alpine3.16

WORKDIR /app
COPY package*.json ./
COPY yarn.lock .

RUN yarn install

COPY src ./src
COPY .env .
COPY jest.config.js .
COPY tsconfig.json .

RUN ls .

RUN npm run build

RUN ls ./build

ENV NODE_PATH=./build



CMD ["npm", "start"]