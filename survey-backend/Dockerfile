FROM node:12-alpine

RUN mkdir -p /usr/app/survey-backend/dist
WORKDIR /usr/app/survey-backend

COPY package.json ./
COPY index.js ./
COPY ./routes ./routes
COPY ./controllers ./controllers
COPY ./config ./config

RUN npm install

COPY . .

EXPOSE 5000

CMD npm start