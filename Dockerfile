FROM node:12-alpine

WORKDIR /usr/wefox

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT 3000

EXPOSE 3000

CMD ["sh", "-c", "npm run start"]
