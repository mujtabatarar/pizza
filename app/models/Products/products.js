module.exports = (sequelize, Sequelize) => {
  const products = sequelize.define("products", 
    {
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      stock: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isAvaliable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      categoryId:{
        type: Sequelize.INTEGER,
        allowNull: true
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    }
  );
  return products;
};