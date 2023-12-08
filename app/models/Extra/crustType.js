module.exports = (sequelize, Sequelize) => {
  const crustType = sequelize.define("crustType", 
    {
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      price: {
        type: Sequelize.STRING,
        allowNull: true
      }
    }
  );
  return crustType;
};