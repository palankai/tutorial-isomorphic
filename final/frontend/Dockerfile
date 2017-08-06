FROM node:alpine

EXPOSE 8080
ENV SRC_PATH=/usr/src/frontend
ENV BUILD_PATH=/var/lib/frontend

RUN mkdir -p $SRC_PATH
RUN mkdir -p $BUILD_PATH
RUN ln -s $SRC_PATH/node_modules/ $BUILD_PATH/node_modules

WORKDIR $SRC_PATH

CMD ["ash"]
