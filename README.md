# Weather API

  
A simple web application which consumes an api and store some data on a data store.

## Configuration

* Run with docker container


```bash

docker-compose up

```
  

* Run on local machine

  

```bash

npm install

```

  

* Configure Database credentials

  

```env

JWT_EXPIRY=
REDIS_URL=
DOMAIN=localhost
PORT=
NODE_ENV=
DB_URI=
JWT_SECRET=
WEATHER_API_KEY=
WEATHER_HOST=
GOOGLE_HOST=
GOOGLE_API_KEY=

  

```

  
  * Run Migration to create database

  

```npm

npm run migrate

```



* Start locally by running

  

```npm

npm run start:dev

```

  

* To build and run on production

```npm

npm start

```