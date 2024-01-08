const databaseConfig = require("../config/database");
const Sequelize = require("sequelize");
const sequelizeInstance = new Sequelize(databaseConfig.DB, databaseConfig.USER, databaseConfig.PASSWORD, {
  host: databaseConfig.HOST,
  port: 3306,
  dialect: databaseConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: databaseConfig.pool.max,
    min: databaseConfig.pool.min,
    acquire: databaseConfig.pool.acquire,
    idle: databaseConfig.pool.idle
  }
});
const db = {};

const userModel = require("./user");
const adminModel = require("./admin");
const settingModel = require("./setting");
const roleModel = require("./role");
const permissionsModel = require("./permissions");
const categoryModel = require("./category");
const productsModel = require("./products");
const varientsModel = require("./varients");
const imagesModel = require("./images");
const otpModel = require("./otp");

// extra
const cheeseModel = require("./Extra/cheese");
const crustTypeModel = require("./Extra/crustType");
const sauceModel = require("./Extra/sauce");
const toppingsModel = require("./Extra/toppings");
const veggiesModel = require("./Extra/veggies");

db.users = userModel(sequelizeInstance, Sequelize);
db.admins = adminModel(sequelizeInstance, Sequelize);
db.setting = settingModel(sequelizeInstance, Sequelize);
db.role = roleModel(sequelizeInstance, Sequelize);
db.permissions = permissionsModel(sequelizeInstance, Sequelize);
db.categories = categoryModel(sequelizeInstance, Sequelize);
db.products = productsModel(sequelizeInstance, Sequelize);
db.varients = varientsModel(sequelizeInstance, Sequelize);
db.images = imagesModel(sequelizeInstance, Sequelize);
db.otp = otpModel(sequelizeInstance, Sequelize);

// extra
db.cheese = cheeseModel(sequelizeInstance, Sequelize);
db.crust_type = crustTypeModel(sequelizeInstance, Sequelize);
db.sauce = sauceModel(sequelizeInstance, Sequelize);
db.toppings = toppingsModel(sequelizeInstance, Sequelize);
db.veggies = veggiesModel(sequelizeInstance, Sequelize);
// db.users = require("./user")(sequelizeInstance, Sequelize);
// db.admins = require("./admin")(sequelizeInstance, Sequelize);
// db.role = require("./role")(sequelizeInstance, Sequelize);
// db.permissions = require("./permissions")(sequelizeInstance, Sequelize);
// db.categories = require("./category")(sequelizeInstance, Sequelize);
// db.products = require("./products")(sequelizeInstance, Sequelize);
// db.varients = require("./varients")(sequelizeInstance, Sequelize);
// db.images = require("./images")(sequelizeInstance, Sequelize);
// db.otp = require("./otp")(sequelizeInstance, Sequelize);
// //extra
// db.cheese = require('./Extra/cheese')(sequelizeInstance,Sequelize)
// db.crust_type = require('./Extra/crustType')(sequelizeInstance,Sequelize)
// db.sauce = require('./Extra/sauce')(sequelizeInstance,Sequelize)
// db.toppings = require('./Extra/toppings')(sequelizeInstance,Sequelize)
// db.veggies = require('./Extra/veggies')(sequelizeInstance,Sequelize)

/************************ *********************/
db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;

/********* relations ************************/
db.role.hasMany(db.admins, {foreignKey : "roleId"} )
db.admins.belongsTo(db.role)

db.categories.hasMany(db.products, { foreignKey: "categoryId" });
db.products.belongsTo(db.categories)

db.products.hasMany(db.varients, { foreignKey: "productId" });
db.varients.belongsTo(db.products)


db.varients.hasMany(db.images, {foreignKey: "varientId"});
db.images.belongsTo(db.varients)

/****************************************** */
module.exports = db;
