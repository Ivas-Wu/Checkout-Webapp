import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
require('dotenv').config()

const app = express();

// parse application/json
app.use(json())

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }))

var corsOptions = {
  origin: 'http://localhost:3005'
}
// use cors options
app.use(cors(corsOptions))

// connect to db
import db from "./app/models";
db.sequelize.authenticate().then(() => {
      console.log("Connected to the database!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

// sync
db.sequelize.sync()

// ONLY UNCOMMENT BELOW THE FIRST TIME AFTER YOU CHANGE AN OBJECT MODEL
// BEWARE IT WILL DROP TABLES
// db.sequelize.sync({ force: true }).then(() => {
// console.log("Drop and re-sync db.");
// });


// routes
import user from './app/routes/users';
app.use('/api/users', user)
import goal from './app/routes/goals';
app.use('/api/goals', goal)
const receipt = require('./app/routes/receipts')
app.use('/api/receipts', receipt)
const item = require('./app/routes/items')
app.use('/api/items', item)

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});