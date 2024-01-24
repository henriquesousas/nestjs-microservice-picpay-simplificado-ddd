FROM node:18 as development
WORKDIR /home/node/app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
RUN npm run build