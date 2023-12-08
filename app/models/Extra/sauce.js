module.exports = (sequelize, Sequelize) => {
  const sauce = sequelize.define("sauce", 
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
  return sauce;
};