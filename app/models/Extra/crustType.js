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
      },
      isAvaliable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      }
    }
  );
  return crustType;
};