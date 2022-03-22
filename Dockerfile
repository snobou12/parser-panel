FROM node:16.13.0-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install --only=prod
COPY . .
RUN npm run build

FROM nginx:alpine
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]