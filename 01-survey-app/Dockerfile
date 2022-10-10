#For server deployment
FROM node:alpine as build

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm ci --production

COPY . . 

RUN npm run build

FROM nginx:alpine as prod

COPY --from=build ./app/build /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80