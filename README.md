# E-Commerce Store with NodeJS

This is an Express service that provides authorization functionality and includes separate folders for users and products.
It also uses Sequelize ORM with SQLite as the database, along with the JSON Web Token (JWT) and AJV libraries.

## Project Structure
 - `index.js`: The main entry point of the application.
 - `config.js`: Contains configuration files for the application.
 - `authorization`
   - `controllers`: Controller files for authentication endpoints.
   - `schemas`: JSON Schemas against which the body of various routes will be validated.
   - `routes.js`: Registers all the authentication routes.
 - `products`
   - `controllers`: Controller files for product master CRUD endpoints.
   - `schemas`: JSON Schemas against which the body of various routes will be validated.
   - `routes.js`: Registers all the product CRUD routes.
 - `users`
   - `controllers`: Controller files for user master CRUD endpoints.
   - `schemas`: JSON Schemas against which the body of various routes will be validated.
   - `routes.js`: Registers all the user CRUD routes.
 - `common`
   - `middlewares`: Various middlewares that can be used in various routes like (isAuthenticated, CheckPermissions etc.)
   - `models`: Sequelise models for the Product and User Tables
 - `storage`: Local storage, that stores all the SQLite tables.

## Prerequisites
Before running the application, make sure you have the following installed:
1. NodeJS (v18)
2. NPM (v9)

## Installation
1. Clone the repository: `git clone https://github.com/arvindkalra08/e-commerce`
2. Navigate to the project directory: `cd e-commerce-service`
3. Install the dependencies: `npm install`

## Usage

To start the service, run the following command:
```shell
npm start
```

## License
This project is licensed under the MIT License.




