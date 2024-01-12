module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define(
    'customers',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profileImg: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      customerId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      totalOrders: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }
    }
  );
  return users
}
