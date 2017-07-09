FROM node:alpine

RUN mkdir /var/www
RUN mkdir -p /usr/src/frontend

WORKDIR /usr/src/frontend

COPY package.json .

RUN npm install

COPY . .

CMD ["ash"]

