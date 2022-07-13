module.exports = (sequelize, Sequelize) => {
  const Receipt = sequelize.define('receipt', {
    store: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    total: {
      type: Sequelize.DECIMAL(19, 4),
    },
  });
  return Receipt;
};
