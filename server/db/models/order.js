const Sequelize = require('sequelize')
const db = require('../db')

// Need to be associated with Line Item and User
const Order = db.define('order', {
  address: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Order
