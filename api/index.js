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
  origin: 'http://localhost:3000'
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

// to force sync during development
// db.sequelize.sync({ force: true }).then(() => {
// console.log("Drop and re-sync db.");
// });


// routes
import user from './app/routes/users';
app.use('/api/users', user)
import goal from './app/routes/goals';
app.use('/api/goals', goal)

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});