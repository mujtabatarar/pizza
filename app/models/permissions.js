module.exports = (sequelize, Sequelize) => {
    const permissions = sequelize.define(
      'permissions',
      {
        categoryName: Sequelize.STRING,
        categorySequence: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        permissionAccessName: Sequelize.STRING,
        permissionAccessCode: Sequelize.STRING,
        permissionSequence: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
        status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          default: true
        },
      },
      {
        indexes: [
          // Create a unique index on email
          {
            unique: true,
            fields: ['categoryName', 'permissionAccessName', 'permissionAccessCode', 'permissionSequence'],
            name : 'uniquePermissionColumns'
          },
        ],
      }
    );

    return permissions;
  }
  