# Checkout API
This is the API for the Checkout App
## Software Requirements:
- NodeJS @14.15.2
    - Run `node -v` to see if you already it
    - I don't think the version matters too much, if you are having problems though switch to this one
## First Time Setup:
- Copy the `.env` file from the discord next to `.env.example` in the repo
    - Ensure it is `.env` and not just `env`, not sure why discord does that

## Running Instructions
 1. `npm install`
 2. `npm run start` or `npm run dev`. Dev refreshes the server after every change so you don't have to manually restart

## Manually Accessing the DB
- You will need a PostgresQL client to do this (I use PGAdmin but if you have a different preference it should still work)

### PGAdmin Setup Steps
 1. Select "Register a Server"
 2. Add any name you would like as the Name under the General tab (It doesn't matter in terms of the connect, just how you organize them)
 3. Copy and paste the host name from the env file into the hostname bar in the connection tab
 4. Ensure the port is 5432 and the Maintenance database is postgres (should be by default)
 5. Ensure the username is postgres (should also be default)
 6. Paste the password from the env file in. 
 7. Save and you should be connected!

### Using PGAdmin
- They have pretty good docs, almost identical syntax to ECE356, there's just a UI now
- Use the window on the left to selet the postgres database from inside the instance 
- To view the tables in a UI select Schemas -> Public -> Tables then select from there
- A better way to do this is to just use Tools -> Query Tool from the top navbar, then just write the SQL you need in there (i.e. `SELECT * FROM users`)

## Using Postman to Manually Call the API
- Download and install Postman, you will need to create an account
- Create a new collection, then add a folder for whatever resource you need if it doesn't already exist (i.e. Users, Purchases, etc)
- Create a new request for the API endpoint you are trying to hit from inside that folder
- Use the `routes/<resoure>.js` file to figure out what type of request it is and select from drop down (GET, POST, PUT, etc)
- Enter the request URL as `localhost:3000/api/<resource>/<optional_path>`
    - The resource can be found in the routes section of the root `index.js` (in the `app.use` statement)
    - The optional path can be found in the `routes/<resource>.js`
        - If this path is just `/`, omit it.
        - If this path includes a `:keyword` block, that means it is a parameter
            - In this case, you will need to go to the params section of postman and add a valid value for this param
- Enter a valid body for this request in the body section
    - In the body section, select raw -> JSON as the type
    - A valid JSON body is wrapped by `{ }` and has all string values in double quotes
    - More documentation on the fields for each resource will come out later