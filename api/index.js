const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const app = express();

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

var corsOptions = {
  origin: 'http://localhost:3005'
}
// use cors options
app.use(cors(corsOptions))

// connect to db
const db = require("./app/models");
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
const user = require('./app/routes/users')
app.use('/api/users', user)
const goal = require('./app/routes/goals')
app.use('/api/goals', goal)
const receipt = require('./app/routes/receipts')
app.use('/api/receipts', receipt)
const item = require('./app/routes/items')
app.use('/api/items', item)
const scanner = require('./app/routes/scanner')
app.use('/api/scanner', scanner)

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});