module.exports = (sequelize, Sequelize) => {
  const image = sequelize.define("image", 
    {
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    }
  );
  return image;
};