FROM node:13.12.0-alpine as build-stage
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build --prod

FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY ./ssl/forumWebApi.crt ./ssl/forumWebApi.key  /etc/nginx/ssl/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]