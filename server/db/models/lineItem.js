const Sequelize = require('sequelize')
const db = require('../db')

// Attributes: Price, Quantity
// Associations with Order and Product
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

