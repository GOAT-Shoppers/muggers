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
    type: Sequelize.INTEGER,
    allowNull: false
  },
  getPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      return (this.price / 100).toFixed(2);
    }
  }
})

module.exports = LineItem

