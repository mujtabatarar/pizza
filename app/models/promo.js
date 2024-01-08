// promoCode.js
module.exports = (sequelize, Sequelize) => {
    const PromoCode = sequelize.define("promoCode", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      discountType: {
        type: Sequelize.ENUM("percentage", "amount"),
        allowNull: false,
      },
      discountValue: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      minBasketValue: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      totalVouchers: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      redeemsPerCustomer: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      validity: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      applicablePaymentTypes: {
        type: Sequelize.STRING,
        allowNull: true,
        // Comma-separated values, e.g., 'cash,card', both
      },
      applicablePaymentTypes: {
        type: Sequelize.STRING,
        allowNull: true,
        // Comma-separated values, e.g., 'cash,card', both
      },

    });
  
    // Define associations
    PromoCode.hasMany(sequelize.models.order, { foreignKey: 'promoCode', sourceKey: 'name' });
  
    return PromoCode;
  };
  