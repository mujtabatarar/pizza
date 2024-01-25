// order.js
module.exports = (sequelize, Sequelize) => {
    const order = sequelize.define("order", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
          min: 10000,
        },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        // 'pending', 'active', 'delivered', 'customerCancelled'
      },
      orderFrom: {
        type: Sequelize.STRING,
        allowNull: false,
        // 'admin', 'customer',
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
        // 'cash', 'card'
      },
      deliveryType: {
        type: Sequelize.STRING,
        allowNull: false,
        //'onsite', 'offsite'
      },
      preparationTimeMinutes: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      deliveryTimeMin: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      deliveryTimeMax: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      orderCreationTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      orderReadyTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      orderDeliveryTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      promoCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      promoCodeDiscountType: {
        type: Sequelize.ENUM("percentage", "amount"),
        allowNull: true,
      },
      promoCodeDiscountValue: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      restaurantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dayId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      deliveryLatitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      deliveryLongitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      deliveryRadius: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  
    // Define associations
 
    // Calculate distance between two sets of latitude and longitude coordinates
    order.prototype.calculateDistance = function (restaurantLatitude, restaurantLongitude) {
      if (!this.deliveryLatitude || !this.deliveryLongitude) {
        return null; // Handle missing coordinates
      }
  
      const R = 6371; // Radius of the Earth in kilometers
      const lat1 = this.deliveryLatitude;
      const lon1 = this.deliveryLongitude;
      const lat2 = restaurantLatitude;
      const lon2 = restaurantLongitude;
  
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
  
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
      const distance = R * c;
      return distance;
    };
  
    // Convert degrees to radians
    function toRad(degrees) {
      return degrees * (Math.PI / 180);
    }
  
    return order;
  };
  