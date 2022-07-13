const db = require("../models");
const Receipt = db.receipt;
// create a new receipt
exports.create = (req, res) => {
  // create a receipt
  const receipt = {
    store: req.body.store,
    category: req.body.category,
    date: req.body.date,
    total: req.body.total,
    userId: req.body.userId,
  };
  // save receipt to database
  Receipt.create(receipt)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error creating receipt",
      });
    });
};
// get all receipts from the database.
exports.findAll = (req, res) => {
  const userId = req.query.userId;
  var condition = userId ? { userId: userId } : null;
  Receipt.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error getting all receipts",
      });
    });
};
// find a receipt using id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Receipt.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `no receipt id=${id} found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "error getting receipt id=" + id,
      });
    });
};
// update a receipt by id
exports.update = (req, res) => {
  const id = req.params.id;
  Receipt.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "receipt updated",
        });
      } else {
        res.send({
          message: `can't find receipt with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "error updating receipt with id=" + id,
      });
    });
};
// delete a receipt by id
exports.delete = (req, res) => {
  const id = req.params.id;
  Receipt.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "receipt deleted",
        });
      } else {
        res.send({
          message: `no receipt id=${id} found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "error deleting receipt id=" + id,
      });
    });
};
