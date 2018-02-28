const User = require('./user');
const Order = require('./order');
const LineItem = require('./lineItem');
const Category = require('./category');
const Product = require('./product');
const Review = require('./review');
const Address = require('./address');

Category.belongsToMany(Product, {through: 'product_category'});
Product.belongsToMany(Category, {through: 'product_category'});
// Product.belongsToMany(Category);

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

Order.belongsTo(Address);
User.hasMany(Order);

Address.hasMany(Order);
Address.belongsTo(User);
User.hasMany(Address);

Review.belongsTo(User);
User.hasMany(Review);
Review.belongsTo(Product);
Product.hasMany(Review);
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  LineItem,
  Review,
  Product,
  Address,
  Category
}
