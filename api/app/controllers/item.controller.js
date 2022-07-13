const db = require('../models');
const Item = db.item;
// create a new item
exports.create = (req, res) => {
  // create an item
  const item = {
    productName: req.body.productName,
    category: req.body.category,
    price: req.body.price,
    numberOf: req.body.numberOf,
    userId: req.body.userId,
    receiptId: req.body.receptId,
  };
  // save item to database
  Item.create(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'error creating item',
      });
    });
};
// get all items from the database.
exports.findAll = (req, res) => {
  const userId = req.query.userId;
  var condition = userId ? { userId: userId } : null;
  const receiptId = req.query.receiptId;
  if (receiptId) {
    condition.receiptId = receiptId;
  }
  Item.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'error getting all items',
      });
    });
};
// find an item using id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Item.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `no item id=${id} found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error getting item id=' + id,
      });
    });
};
// update an item by id
exports.update = (req, res) => {
  const id = req.params.id;
  Item.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'item updated',
        });
      } else {
        res.send({
          message: `error updating item with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error updating item with id=' + id,
      });
    });
};
// delete an item by id
exports.delete = (req, res) => {
  const id = req.params.id;
  Item.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'item deleted',
        });
      } else {
        res.send({
          message: `no item id=${id} found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error deleting item id=' + id,
      });
    });
};
