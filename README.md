# ecommerce-turing
A full-stack E-Commerce solution built for the Turing project test.

[![Build Status](https://travis-ci.com/ovieokeh/ecommerce-turing.svg?token=ib4xukwyyyzrf2XQqfZc&branch=develop)](https://travis-ci.com/ovieokeh/ecommerce-turing)
[![Maintainability](https://api.codeclimate.com/v1/badges/14f7f4b747b1a3356b58/maintainability)](https://codeclimate.com/github/ovieokeh/ecommerce-turing/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/14f7f4b747b1a3356b58/test_coverage)](https://codeclimate.com/github/ovieokeh/ecommerce-turing/test_coverage)

This is a monorepo containing the API and Frontend of the Turing Fullstack test.

This project is an E-Commerce store that sells T-Shirts powered with a Stripe payment system. Here are the technologies used in the project.

Access the demo here: [Link to Hosted Demo](http://shopstack-turing.herokuapp.com/)

## Backend API

Technologies used:

- Node.js with Express.js
- JWT for authentication
- Sequelize for database management
- Redis for server side caching of GET endpoints
- Throng for worker management

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

## Frontend App

Technologies used:

- React.js
- Redux (with Redux Thunk)
- React Router
- Axios (for network calls to the backend)
- Sass (for styling)

The frontend is a fully responsive Single Page Application (SPA) optimised for performance by limiting renders when necessary.
