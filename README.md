## FX TRADING APP

## Description

This technical assessment outlines the development of a backend FX Trading App using NestJS, focusing on creating a multi-currency wallet system that enables users to register, verify their email, fund their wallet, and perform currency conversions. The application requires real-time FX rate integration, secure transaction handling, and a robust architecture that supports multiple currencies while ensuring data consistency, preventing double-spending, and maintaining comprehensive transaction history.

## Contribution

To get started with this project, clone the repo by running the command git clone https://github.com/Adetoyebamise/fx-trading-app.git or downloading the zip file

In the root of the project run the following command

```bash
 npm install
```

Start the development server (remember to put in the right environment variables) via the command

```bash
 npm run start:dev
```

### Containerizing the API

#### Build the initial docker image

```bash
docker-compose up --build
```

#### Running the Dev Docker container

To run the container, use the following command:

```bash
 docker-compose up
```

- The server will be running on [localhost:3000](http://0.0.0.0:3000)

## CONTRIBUTING TO fx trading WALLET

#### While the fx-trading-wallet project is completely free to use and open source, here are a few things to note when making Pull Requests

- Ensure the PR is made to the `dev` branch so it can be reviewed before it gets merged to the main branch (we are currently looking to implement a CI/CD pipeline as soon as possible) so as to automate things and reduce room for human error
- The code architecture and design pattern for the PR should be consistent with the existing codebase

## Stay in touch

- Author - [Adetoye Babalola](https://www.linkedin.com/in/adetoye-babalola-355118167/)
- Twitter - [@adetoyebamise](https://twitter.com/Adetoyebamise)

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Database Diagram

![alt text](image.png)

APIs'

```sh
`curl -XPOST "http://127.0.0.1:3000/auth/signup" \
    -H "Authorization: Bearer f77cf263b704...9793022df08d91b9" \
    -H "Content-type: application/json" \
    -d '{
        "email": "andris@example.com",
        "password": "andris123"
    }'
```

```sh
`curl -XPOST "http://127.0.0.1:3000/auth/signin" \
    -H "Authorization: Bearer f77cf263b704...9793022df08d91b9" \
    -H "Content-type: application/json" \
    -d '{
        "email": "andris@example.com",
        "password": "andris123"
    }'
```

```sh
`curl -XPOST "http://127.0.0.1:3000/auth/verify" \
    -H "Authorization: Bearer f77cf263b704...9793022df08d91b9" \
    -H "Content-type: application/json" \
    -d '{
        "email": "andris@example.com",
        "emailToken": "5632"
    }'
```

````sh
`
curl -XGET "http://localhost:3000/wallet/123?currency=USD" \
     -H "Authorization:  Bearer f77cf263b704...9793022df08d91b9"
`
```sh
````
