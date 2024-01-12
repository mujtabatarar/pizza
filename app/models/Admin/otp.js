module.exports = (sequelize, Sequelize) => {
    const otp = sequelize.define(
      'otp',
      {
        otp: Sequelize.STRING,
        phoneNo: Sequelize.STRING,
        deliveryStatus: {
            type: Sequelize.ENUM("sent", "verified"),
            defaultValue: null
        },
      }
    );

    return otp;
  }
  