// // order.js
// module.exports = (sequelize, Sequelize) => {
//     const Order = sequelize.define("order", {
//       // Order details
//       status: {
//         type: Sequelize.STRING, // Use ENUM for status if there are predefined statuses (pending, active, delivered, canceled, etc.)
//         allowNull: false,
//       },
//       totalPrice: {
//         type: Sequelize.DECIMAL(10, 2),
//         allowNull: false,
//       },
//       // ... other order details
  
//       // Associations
//       cheeseId: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//       },
//       crustTypeId: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//       },
//       sauceId: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//       },
//       toppingsId: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//       },
//       veggiesId: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//       },
//       productId: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//       },
//       promoCodeId: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//       },
//     });
  
//     // Define associations
//     Order.belongsTo(sequelize.models.cheese, { foreignKey: 'cheeseId' });
//     Order.belongsTo(sequelize.models.crustType, { foreignKey: 'crustTypeId' });
//     Order.belongsTo(sequelize.models.sauce, { foreignKey: 'sauceId' });
//     Order.belongsTo(sequelize.models.toppings, { foreignKey: 'toppingsId' });
//     Order.belongsTo(sequelize.models.veggies, { foreignKey: 'veggiesId' });
//     Order.belongsTo(sequelize.models.products, { foreignKey: 'productId' });
//     Order.belongsTo(sequelize.models.promoCode, { foreignKey: 'promoCodeId' });
  
//     return Order;
//   };