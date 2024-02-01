const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const restaurantTiming = sequelize.define('restaurantTiming', {
    day: {
      type: DataTypes.STRING, // 'Mon', 'Tue', etc.
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    serviceType: {
      type: DataTypes.ENUM('dine-in', 'delivery', 'take-away'),
      allowNull: false,
    },
    isSpecialDay: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });

  return restaurantTiming;
};
  