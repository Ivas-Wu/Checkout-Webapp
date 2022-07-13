const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models here
const User = require("./user.model.js")(sequelize, Sequelize);
const Goal = require("./goal.model.js")(sequelize, Sequelize);

//handle relationships here
User.hasMany(Goal)
Goal.belongsTo(User)

// handle setting to db here
db.user = User
db.goal = Goal

// export
module.exports = db;