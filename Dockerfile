FROM node:latest

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV production

RUN npm install --quiet

COPY ./ .

ENTRYPOINT ["npm", "run"]

CMD ["start"]
