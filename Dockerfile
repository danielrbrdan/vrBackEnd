FROM node:18.16-alpine

COPY . .
COPY ./.env.development  ./.env

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
