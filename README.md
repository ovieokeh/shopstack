# shopstack
A full-stack E-Commerce solution built entirely with JavaScript

[![Build Status](https://travis-ci.com/ovieokeh/ecommerce-turing.svg?token=ib4xukwyyyzrf2XQqfZc&branch=develop)](https://travis-ci.com/ovieokeh/ecommerce-turing)
[![Maintainability](https://api.codeclimate.com/v1/badges/14f7f4b747b1a3356b58/maintainability)](https://codeclimate.com/github/ovieokeh/ecommerce-turing/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/14f7f4b747b1a3356b58/test_coverage)](https://codeclimate.com/github/ovieokeh/ecommerce-turing/test_coverage)

This is a monorepo containing the API and Frontend of the Shopstack e-commerce platform.

This project is an E-Commerce store that sells T-Shirts powered with a Stripe payment system. Here are the technologies used in the project.

Access the demo here: [Link to Hosted Demo](http://shopstack-e.herokuapp.com/)

## How To Run The App
This app makes use of `.env` files to store sensitive data so first and foremost, you must have two `.env` files: one in the `packages/api` directory and one in the `packages/frontend` directory.

The `.env` file in the `packages/api` directory should contain the following data:
```
NODE_ENV=development
PORT=[preferred port]
SALT_ROUNDS=[any integer > 0 && < 20]
SECRET_KEY=[a string for encrypting JWT tokens]

DB_CONNECTION_HOST=[your mysql database host]
DB_CONNECTION_USER=[your mysql database user]
DB_CONNECTION_PASSWORD=[your mysql database password]
DB_CONNECTION_NAME=[your mysql database name]

DB_CONNECTION_HOST_TEST=[your mysql test database host]
DB_CONNECTION_USER_TEST=[your mysql test database user]
DB_CONNECTION_PASSWORD_TEST=[your mysql test database password]
DB_CONNECTION_NAME_TEST=[your mysql test database name]

STRIPE_SECRET_KEY=[a stripe api key gotten from stripe]
```

The `.env` file in the `packages/frontend` directory should contain the following data:
```
REACT_APP_API_URL=[http://localhost:<your_api_port>/api]
```

After setting up the environment keys, you can then run the following commands to get the app started:
```
$ npm i && npm run install:all
$ npm start
```
Now navigate to `http://localhost:<your_api_port>` from your browser and the app should be live.

Building The App
------
If you want to build the app and run the compiled version locally, you have to add a `.env` file in the root directory of the project. The `.env` file should contain the contents of the one present in the `packages/api` directory.

Then in the root directory, run the following commands:
```
$ npm run build
$ npm start
```

## How To Run The API Tests
There are tests for all the API endpoints to ensure that they work as expected. To run them, first ensure that you have your environment keys setup then navigate to `/packages/api` and run `npm t`.

## Project Info

### Backend API

Technologies used:

- Node.js with Express.js
- JWT for authentication
- node-mysql2 for database management
- Redis for server side caching of GET endpoints
- Throng for worker management

Access the API Documentation here: [Link to Documentation](https://shopstack-e.herokuapp.com/api-docs/). To access it on local, build the app, run `npm start` and navigate to `localhost:[port]/api-docs`.

The API is built on top of Node.js with the Express framework for performance and maintainability. For security, protected endpoints require a valid JWT token which is attached in the request headers like so:

```
user-key: <TOKEN>
```

Most of the GET endpoints are cached with a high-performant Redis server to prevent unnecessary calls to the database. The cached data expires after 1 hour so that outdated content is refreshed automatically.

There are integration tests for all the controllers that ensure that the API works as expected. To run the tests, run the following command from the root directory:

```
cd packages/api && npm run test
```

Note that for the tests to run, you have to create a `.env` file with these details:

```
NODE_ENV=development
PORT=<ANY_FREE_PORT>
SALT_ROUNDS=<A_NUMBER_BETWEEN 1 - 10>
SECRET_KEY=<A_LONG_STRING>

DB_USERNAME_TEST=<DATABASE_USERNAME>
DB_PASSWORD_TEST=<DATABASE_PASSWORD>
DB_NAME_TEST=<DATABASE_NAME>
DB_HOST_TEST=<DATABASE_HOST>
```

### Frontend App

Technologies used:

- React.js
- Redux (with Redux Thunk)
- React Router
- Axios (for network calls to the backend)
- Sass (for styling)

The frontend is a fully responsive Single Page Application (SPA) optimised for performance by limiting renders when possible.
