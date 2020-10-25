FROM node:12.19.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./ .

RUN yarn

RUN yarn run build

CMD [ "yarn", "run", "start" ]