const db = require('../models');
const Target = db.target;
// create a new target
exports.create = (req, res) => {
  // create a target
  const target = {
    category: req.body.category,
    value: req.body.value,
    userId: req.body.userId,
  };
  // save target to database
  Target.create(target)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'error creating target',
      });
    });
};
// get all targets from the database.
exports.findAll = (req, res) => {
  const userId = req.query.userId;
  var condition = userId ? { userId: userId } : null;
  Target.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'error getting all targets',
      });
    });
};
// find a target using id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Target.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `no target id=${id} found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error getting target id=' + id,
      });
    });
};
// update a target by id
exports.update = (req, res) => {
  const id = req.params.id;
  Target.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'target updated',
        });
      } else {
        res.send({
          message: `error updating target with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error updating target with id=' + id,
      });
    });
};
// delete a target by id
exports.delete = (req, res) => {
  const id = req.params.id;
  Target.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'target deleted',
        });
      } else {
        res.send({
          message: `no target id=${id} found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error deleting target id=' + id,
      });
    });
};
