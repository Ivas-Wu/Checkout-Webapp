const db = require('../models');
const Goal = db.goal;
// create a new goal
exports.create = (req, res) => {
  // create a goal
  const goal = {
    goalName: req.body.goalName,
    goalDesc: req.body.goalDesc,
    targetDate: req.body.targetDate,
    userId: req.body.userId,
  };
  // save goal to database
  Goal.create(goal)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'error creating goal',
      });
    });
};
// get all goals from the database.
exports.findAll = (req, res) => {
  const userId = req.query.userId;
  var condition = userId ? { userId: userId } : null;
  Goal.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'error getting all goals',
      });
    });
};
// find a goal using id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Goal.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `no goal id=${id} found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error getting goal id=' + id,
      });
    });
};
// update a goal by id
exports.update = (req, res) => {
  const id = req.params.id;
  Goal.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'goal updated',
        });
      } else {
        res.send({
          message: `can't find goal with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error updating goal with id=' + id,
      });
    });
};
// delete a goal by id
exports.delete = (req, res) => {
  const id = req.params.id;
  Goal.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'goal deleted',
        });
      } else {
        res.send({
          message: `no goal id=${id} found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error deleting goal id=' + id,
      });
    });
};
