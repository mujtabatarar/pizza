// orderItem.js
module.exports = (sequelize, Sequelize) => {
    const orderItem = sequelize.define("orderItem", {  
      // crustTypeId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      // },
      // sauceId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      // },
      // toppingsId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      // },
      // veggiesId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      // },
      // cheeseId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      // },
    });
  
    // OrderItem.belongsTo(sequelize.models.order);
    // OrderItem.belongsTo(sequelize.models.products);
    // OrderItem.belongsTo(sequelize.models.varients);
    // OrderItem.belongsTo(sequelize.models.crustType, { foreignKey: 'crustTypeId', as: 'crustType' });
    // OrderItem.belongsTo(sequelize.models.sauce, { foreignKey: 'sauceId', as: 'sauce' });
    // OrderItem.belongsTo(sequelize.models.toppings, { foreignKey: 'toppingsId', as: 'toppings' });
    // OrderItem.belongsTo(sequelize.models.veggies, { foreignKey: 'veggiesId', as: 'veggies' });
    // OrderItem.belongsTo(sequelize.models.cheese, { foreignKey: 'cheeseId', as: 'cheese' });
  
    return orderItem;
  };
  