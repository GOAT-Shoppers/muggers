const Sequelize = require('sequelize')
const db = require('../db')

// Foreign key for Order Model
// Foreign key for Product Model
// Needs a price for the entire order that can be passed to Order
const LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
})

module.exports = LineItem

