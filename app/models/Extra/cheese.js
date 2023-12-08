module.exports = (sequelize, Sequelize) => {
  const cheese = sequelize.define("cheese", 
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
  return cheese;
};