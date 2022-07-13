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
const User = require('./user.model.js')(sequelize, Sequelize);
const Goal = require('./goal.model.js')(sequelize, Sequelize);
const Receipt = require('./receipt.model.js')(sequelize, Sequelize);
const Item = require('./item.model.js')(sequelize, Sequelize);

//handle relationships here
// goal relationships
User.hasMany(Goal);
Goal.belongsTo(User);
// receipt relationships
User.hasMany(Receipt);
Receipt.belongsTo(User);
// item relationsships
User.hasMany(Item);
Item.belongsTo(User);
Receipt.hasMany(Item);
Item.belongsTo(Receipt);

// handle setting to db here
db.user = User;
db.goal = Goal;
db.receipt = Receipt;
db.item = Item;

// export
module.exports = db;
