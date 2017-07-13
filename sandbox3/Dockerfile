FROM node:alpine

ENV SRC_PATH=/usr/src/frontend
ENV BUILD_PATH=/var/lib/frontend

RUN mkdir -p $SRC_PATH
RUN mkdir -p $BUILD_PATH
RUN ln -s $SRC_PATH/node_modules/ $BUILD_PATH/node_modules

WORKDIR $SRC_PATH

COPY package.json .

RUN npm install

COPY . .

RUN npm run test

RUN npm run build

RUN npm run build:server

EXPOSE 8000

CMD ["npm", "run", "start"]
