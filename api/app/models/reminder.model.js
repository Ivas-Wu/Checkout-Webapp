module.exports = (sequelize, Sequelize) => {
  const Reminder = sequelize.define('reminder', {
    reminderName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    reminderDesc: {
      type: Sequelize.TEXT,
    },
    date: {
      type: Sequelize.DATEONLY,
    },
    alertMe: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    alertAt: {
      type: Sequelize.INTEGER
    }
  });
  return Reminder;
};
