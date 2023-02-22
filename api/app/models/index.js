const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models here
const User = require('./user.model.js')(sequelize, Sequelize);
const Goal = require('./goal.model.js')(sequelize, Sequelize);
const Receipt = require('./receipt.model.js')(sequelize, Sequelize);
const Item = require('./item.model.js')(sequelize, Sequelize);
const Reminder = require('./reminder.model.js')(sequelize, Sequelize);

// handle relationships here

// reminder relationships
User.hasMany(Reminder);
Reminder.belongsTo(User);

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
db.reminder = Reminder
db.receipt = Receipt;
db.item = Item;

// export
module.exports = db;
