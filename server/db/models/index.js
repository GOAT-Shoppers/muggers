const User = require('./user');
const Order = require('./order');
const LineItem = require('./lineItem');
const Category = require('./category');
const Product = require('./product');
const Review = require('./review');
const Address = require('./address');
const db = require('../db');

Category.belongsToMany(Product, {through: 'product_category'});
Product.belongsToMany(Category, {through: 'product_category'});

Order.hasMany(LineItem);
LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

User.hasMany(Order);
Order.belongsTo(User);

Address.hasMany(Order);
Order.belongsTo(Address);

Address.belongsTo(User);
User.hasMany(Address);

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Product);
Product.hasMany(Review);


module.exports = {
  User,
  Order,
  LineItem,
  Review,
  Product,
  Address,
  Category,
  db
}
