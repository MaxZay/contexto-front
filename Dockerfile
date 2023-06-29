FROM node:17-alpine

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 5173

CMD [ "yarn", "dev"]