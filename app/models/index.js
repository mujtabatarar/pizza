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

const customerModel = require("./Order/customer");
const adminModel = require("./Admin/admin");
const settingModel = require("./Admin/setting");
const roleModel = require("./Admin/role");
const permissionsModel = require("./Admin/permissions");
const categoryModel = require("./Products/category");
const productsModel = require("./Products/products");
const varientsModel = require("./Products/varients");
const imagesModel = require("./images");
const otpModel = require("./Admin/otp");
const cartModel = require("./Order/cart");
const orderModel = require("./Order/order");
const orderItemModel = require("./Order/orderItem");
const promoModel = require("./promo");

// extra
const cheeseModel = require("./Extra/cheese");
const crustTypeModel = require("./Extra/crustType");
const sauceModel = require("./Extra/sauce");
const toppingsModel = require("./Extra/toppings");
const veggiesModel = require("./Extra/veggies");

db.customers = customerModel(sequelizeInstance, Sequelize);
db.admins = adminModel(sequelizeInstance, Sequelize);
db.setting = settingModel(sequelizeInstance, Sequelize);
db.role = roleModel(sequelizeInstance, Sequelize);
db.permissions = permissionsModel(sequelizeInstance, Sequelize);
db.category = categoryModel(sequelizeInstance, Sequelize);
db.products = productsModel(sequelizeInstance, Sequelize);
db.varients = varientsModel(sequelizeInstance, Sequelize);
db.images = imagesModel(sequelizeInstance, Sequelize);
db.otp = otpModel(sequelizeInstance, Sequelize);
db.cart = cartModel(sequelizeInstance, Sequelize);
db.order = orderModel(sequelizeInstance, Sequelize);
db.orderItem = orderItemModel(sequelizeInstance, Sequelize);
db.promo = promoModel(sequelizeInstance, Sequelize);
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

// db.category.hasMany(db.category, { foreignKey: 'parentId', as: 'subCategories' });
// db.category.belongsTo(db.category, { foreignKey: 'parentId', as: 'parentCategory' });
// Assuming db is your Sequelize instance
db.category.hasMany(db.category, { as: 'subCategories', foreignKey: 'parentId' });
db.category.belongsTo(db.category, { as: 'parentCategory', foreignKey: 'parentId' });

db.category.hasMany(db.products, { foreignKey: "categoryId" });
db.products.belongsTo(db.category)

db.products.hasMany(db.varients, { foreignKey: "productId" });
db.varients.belongsTo(db.products)


db.varients.hasMany(db.images, {foreignKey: "varientId"});
db.images.belongsTo(db.varients)

db.cart.belongsTo(db.customers);
db.cart.belongsTo(db.admins);
db.cart.belongsTo(db.products);
db.cart.belongsTo(db.varients);

// db.order.belongsTo(db.customers, { foreignKey: 'customerId' });
// db.order.belongsTo(db.admins, { foreignKey: 'adminId' });

// Order.belongsTo(sequelize.models.restaurant, { foreignKey: 'restaurantId' });
// Order.belongsTo(sequelize.models.day, { foreignKey: 'dayId' });
db.order.hasMany(db.orderItem, { onDelete: 'CASCADE' });
// db.order.belongsTo(sequelize.models.promoCode, { foreignKey: 'promoCode', targetKey: 'name', as: 'promo' });

// db.promo.hasMany(db.order);
// db.order.belongsTo(db.promo);

db.orderItem.belongsTo(db.order);
db.orderItem.belongsTo(db.products);
db.orderItem.belongsTo(db.varients);



/****************************************** */
module.exports = db;
