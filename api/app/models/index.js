import { DB, USER, PASSWORD, HOST, dialect as _dialect } from "../config/db.config.js";

import Sequelize from "sequelize";
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: _dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models here
const User = require("./user.model.js").default(sequelize, Sequelize);
const Goal = require("./goal.model.js").default(sequelize, Sequelize);

//handle relationships here
User.hasMany(Goal)
Goal.belongsTo(User)

// handle setting to db here
db.user = User
db.goal = Goal

// export
export default db;