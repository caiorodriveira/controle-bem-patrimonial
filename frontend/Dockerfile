FROM node:18-alpine3.15

WORKDIR /app
RUN npm i -g @angular/cli@15
COPY package*.json ./
COPY angular.json ./
COPY tsconfig*.json ./

RUN npm install

COPY src ./src

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
