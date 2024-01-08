// // payment.js
// module.exports = (sequelize, Sequelize) => {
//     const Payment = sequelize.define("payment", {
//       amount: {
//         type: Sequelize.DECIMAL(10, 2),
//         allowNull: false,
//       },
//       method: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         // Possible values: 'cash', 'card'
//       },
//       userId: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//     });
  
//     // Define associations
//     Payment.belongsTo(sequelize.models.user, { foreignKey: 'userId' });
  
//     return Payment;
//   };
  