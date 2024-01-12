module.exports = (sequelize, Sequelize) => {
    const role = sequelize.define(
      'roles',
      {
        code: Sequelize.STRING,
        title: Sequelize.STRING,
        capabilites: {
          type: Sequelize.JSON,
          allowNull: false,
          comment: 'Access Capabilities List'
        },
        status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        indexes: [
          // Create a unique index on email
          {
            unique: true,
            fields: ['code', 'title'],
          },
        ],
      }
    );

    // role.hasMany(sequelize.models.admins, { foreignKey: 'roleId' });


    return role;
  }
  