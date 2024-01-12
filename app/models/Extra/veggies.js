module.exports = (sequelize, Sequelize) => {
  const veggies = sequelize.define("veggies", 
    {
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      price: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isAvaliable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      }
    }
  );
  return veggies;
};