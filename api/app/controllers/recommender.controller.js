const db = require('../models');
const moment = require('moment');
const Receipt = db.receipt;
const sequelize = db.Sequelize;
const Op = sequelize.Op;
// get all time average, can restrict by user or categroy
exports.getAverage = (req, res) => {
  const userId = req.query.userId;
  var condition = userId ? { userId: userId } : {};
  const category = req.query.category;
  if (category) {
    condition.category = category;
  }
  Receipt.findOne({
    where: condition,
    attributes: [[sequelize.fn('AVG', sequelize.col('total')), 'average']],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'error getting average',
      });
    });
};
// get weekly average
exports.getAverageWeekly = (req, res) => {
  const userId = req.query.userId;
  var condition = userId ? { userId: userId } : {};
  const category = req.query.category;
  if (category) {
    condition.category = category;
  }
  condition.date = { [Op.gte]: moment().subtract(7, 'days').toDate() };
  Receipt.findOne({
    where: condition,
    attributes: [[sequelize.fn('AVG', sequelize.col('total')), 'average']],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'error getting average',
      });
    });
};

// get monthly average
exports.getAverageMonthly = (req, res) => {
  const userId = req.query.userId;
  var condition = userId ? { userId: userId } : {};
  const category = req.query.category;
  if (category) {
    condition.category = category;
  }
  // set month to the passed in month
  let month = req.query.month;
  if (!month) {
    // if no passed in month, set to current month (Add 1 cuz 0 indexed)
    month = moment().month() + 1;
  }

  Receipt.findOne({
    where: {
      [Op.and]: [
        condition,
        sequelize.fn('EXTRACT(MONTH from "date") =', month),
      ],
    },
    attributes: [[sequelize.fn('AVG', sequelize.col('total')), 'average']],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'error getting average',
      });
    });
};