const db = require('../models');
const Reminder = db.reminder;
// create a new reminder
exports.create = (req, res) => {
  // create a reminder
  const reminder = {
    reminderName: req.body.reminderName,
    reminderDesc: req.body.reminderDesc,
    date: req.body.date,
    userId: req.body.userId,
    alertAt: req.body.alertAt,
    alertMe: req.body.alertMe,
  };
  // save reminder to database
  Reminder.create(reminder)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'error creating reminder',
      });
    });
};
// get all reminders from the database.
exports.findAll = (req, res) => {
  const userId = req.query.userId;
  var condition = userId ? { userId: userId } : null;
  Reminder.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'error getting all reminders',
      });
    });
};
// find a reminder using id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Reminder.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `no reminder id=${id} found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error getting reminder id=' + id,
      });
    });
};
// update a reminder by id
exports.update = (req, res) => {
  const id = req.params.id;
  Reminder.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'reminder updated',
        });
      } else {
        res.send({
          message: `error updating reminder with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error updating reminder with id=' + id,
      });
    });
};
// delete a reminder by id
exports.delete = (req, res) => {
  const id = req.params.id;
  Reminder.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'reminder deleted',
        });
      } else {
        res.send({
          message: `no reminder id=${id} found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error deleting reminder id=' + id,
      });
    });
};

exports.findAlerts = (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    res.status(500).send({
      message: 'userId required to find alerts',
    });
    return
  }
  Reminder.findAll({ where: { userId: userId, alertMe: true }})
  .then((data) => {
    let out = [];
    data.forEach(reminder_raw => {
      let reminder = reminder_raw.dataValues
      // adjust for alert offset
      due = new Date(reminder.date);
      due.setDate(due.getDate() - reminder.alertAt);
      // get todays date, it compares hours so set hours to match (00:00:00)
      today = new Date();
      today.setUTCHours(0,0,0,0);
      if (today.getTime() == due.getTime()) {
        out.push(reminder_raw)
      }
    })
    res.send(out);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || 'error finding alerts',
    });
  });
}
