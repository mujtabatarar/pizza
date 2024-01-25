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
        type: Sequelize.INTEGER,
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
        type: Sequelize.ENUM("super_admin", "admin", "user"),
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
      emailOtp: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      phoneOtp: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },

      twoFactorEnabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      phoneVerified:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      emailVerified:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      // permissions:{
      //   type: Sequelize.JSON,
      //   allowNull: true,
      //   defaultValue: null
      // }
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //   model: 'roles',
        //   key: 'id',
        // },
      },
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

  // adminUsers.belongsTo(sequelize.models.role, { foreignKey: 'roleId' });

  return adminUsers
}
