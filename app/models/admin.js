module.exports = (sequelize, Sequelize) => {
  const adminUsers = sequelize.define(
    'admins',
    {
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.NUMBER,
        allowNull: false,
      },
      // registrationDate: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      adminType: {
        type: Sequelize.ENUM("super_admin", "admin"),
        defaultValue: "admin"
      },
      superAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      twoFactorEnabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      permissions:{
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: null
      }
    },
    {
      indexes: [
        // Create a unique index on email
        {
          unique: true,
          fields: ['email'],
        },
      ],
    }
  );
  return adminUsers
}
