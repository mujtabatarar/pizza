module.exports = (sequelize, Sequelize) => {
    const cartItem = sequelize.define("cart", {
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      sessionId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      varientPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      orderNotes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      promoIds: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
    return cartItem;
  };