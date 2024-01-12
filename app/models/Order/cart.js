module.exports = (sequelize, Sequelize) => {
    const cartItem = sequelize.define("cart", {
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      customerId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      adminId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sessionId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      selectedProductId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      selectedVariantId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      selectedVariantPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      orderNotes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // isCustomerCart: {
      //   type: Sequelize.BOOLEAN,
      //   default: false,
      // }
    });

    return cartItem;
  };