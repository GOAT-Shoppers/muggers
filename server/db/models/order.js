const Sequelize = require('sequelize')
const db = require('../db')

// Need to be associated with Line Item and User
// Attributes: UserId, addressId, email, status(s,d)
const Order = db.define('order', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  status: {
    type: Sequelize.ENUM('shopping', 'checkedOut', 'cancelled', 'shipped', 'delivered'),
    allowNull: false,
    defaultValue: 'shopping'
  }
})

module.exports = Order
