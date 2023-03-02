module.exports = (sequelize, Sequelize) => {
  const Target = sequelize.define('target', {
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
  return Target;
};
