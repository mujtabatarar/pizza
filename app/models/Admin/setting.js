module.exports = (sequelize, Sequelize) => {
    const settingModel = sequelize.define("setting", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        // unique: true,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      subCategory: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  
    return settingModel;
  };
  