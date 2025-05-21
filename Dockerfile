FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "start"]