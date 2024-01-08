// day.js
module.exports = (sequelize, Sequelize) => {
    const Day = sequelize.define("day", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isOpen: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      openTime: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      closeTime: {
        type: Sequelize.TIME,
        allowNull: true,
      },
    });
  
    // Define associations
    // Example: Day.hasMany(sequelize.models.otherModel, { foreignKey: 'dayId' });
    // ... other associations
  
    return Day;
  };
  