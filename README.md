# mini store

this is an app made for an mini store and have only 2 entities (User, Products)

## Tech that used for this app

- nodeJS
- expressJS
- Typescript
- TypeORM

## setup the app before start

- define a .env file set the variables in it, variables name are:
    * host
    * port
    * user
    * password
    * database
    * env_node `for development mode set it with "dev"`
    * salt `for password encryption`
    * pepper `for password encryption`
    * secret `for token`
- run `npm i` to get all packages
- to start the app, run `npm run start`
- it will run on port `5000`

## APIs to use

### /create-user

To create a new user, send a post request with body contains:
- firstName
- lastName
- email
- password

you will get a token that you can use for creating, editing, delete product

### /signin
To signin as user, send a POST request with body contains:
- email
- password

if you email and password are correct, you will get a token that you can use for creating, editing, delete product

### /create-product
To create new product, send POST request with body contains:
- name
- price
- imageUrl (optinal)
- token

if everything is okay, you will get:
- id
- name
- price
- imageUrl
- token

### /get-product/:id
To get a product, use product id as a parameters with no body and send a GET request, you will get:
- id
- name
- price
- imageUrl (if exist)

### /edit-product
To edit a product, send a PUT requset with body contains:
- id
- name (optional)
- price (optional)
- imageUrl (optional)
- token

if everything is okay, you will get:
- id
- name
- price
- imageUrl
- token

### /delete-product/:id
To delete a product, send a DELETE request with product id in paraments body contains:
- token

if everything is okay, you will get:
- id (id of the deleted product )
- status (deleted)

## Tests
their is some tests on user endpoints, to test them, run `npm run test`
