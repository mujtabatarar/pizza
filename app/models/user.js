module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define(
    'users',
    {
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profileImg: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      accountId: {
        type: Sequelize.STRING,
        allowNull: true
      }
    }
  );
  return users
}
