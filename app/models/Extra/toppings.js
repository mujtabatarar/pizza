module.exports = (sequelize, Sequelize) => {
  const toppings = sequelize.define("toppings", 
    {
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      price: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isAvaliable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      }
    }
  );
  return toppings;
};