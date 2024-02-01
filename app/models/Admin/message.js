// UserMessage Model
module.exports = (sequelize, Sequelize) => {
    const userMessage = sequelize.define("userMessage", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // Default value is set to false (unread)
      },
    });
  
    return userMessage;
  };
  