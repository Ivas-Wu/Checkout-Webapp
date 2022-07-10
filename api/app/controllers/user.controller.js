const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
// create a new user
exports.create = (req, res) => {
// validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "must have an email"
    });
    return;
  }
  // create a user
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    active: req.body.active ? req.body.active : false
  };
  // save user to database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error creating user"
      });
    });
  
};
// get all users from the database.
exports.findAll = (req, res) => {
	const email = req.query.email;
  var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error getting all users"
      });
    });
};
// find a user using id
exports.findOne = (req, res) => {
	const id = req.params.id;
  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `no user id=${id} found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "error getting user id=" + id
      });
    });
};
// update a user by id
exports.update = (req, res) => {
	const id = req.params.id;
  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "user updated"
        });
      } else {
        res.send({
          message: `can't find user with id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "error updating user with id=" + id
      });
    });
};
// delete a user by id
exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "user deleted"
        });
      } else {
        res.send({
          message: `no user id=${id} found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "error deleting user id=" + id
      });
    });
};
// find all active users
exports.findAllActive = (req, res) => {
	User.findAll({ where: { active: true } })
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message:
				err.message || "error getting active users"
		});
	});
};