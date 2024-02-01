// promoCode.js
module.exports = (sequelize, Sequelize) => {
    const promoCode = sequelize.define("promoCode", {
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
        // Comma-separated values, e.g., 'CASH','CARD', 'BOTH',
      },
      forFirstOrder:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      expiryDate:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      isApplicableWithOtherPromoCodes: {
        type: Sequelize.BOOLEAN,
        allowNull: false, // Adjust allowNull based on your requirements
        defaultValue: true, // Set a default value if necessary
      },
      promoUsages:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  
    // Define associations
    // PromoCode.hasMany(sequelize.models.order, { foreignKey: 'promoCode', sourceKey: 'name' });
  
    return promoCode;
  };
  