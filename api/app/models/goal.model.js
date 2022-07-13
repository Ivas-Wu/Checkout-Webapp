module.exports = (sequelize, Sequelize) => {
  const Goal = sequelize.define("goal", {
    goalName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    goalDesc: {
      type: Sequelize.TEXT,
    },
    targetDate: {
      type: Sequelize.DATE,
    },
    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  return Goal;
};
