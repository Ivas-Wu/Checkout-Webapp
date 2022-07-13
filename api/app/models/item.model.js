module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define('item', {
    productName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(19, 4),
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
    },
    numberOf: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });
  return Item;
};
