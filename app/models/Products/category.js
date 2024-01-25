module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define("category", {
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    isAvaliable: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return category;
};
