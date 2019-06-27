FROM node:10

WORKDIR /workdir/src/app

ENV APP_PORT=5000

RUN npm install --global typescript

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${APP_PORT}

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]