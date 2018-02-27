const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmpty: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        isEmpty: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    photo: {
        type: Sequelize.STRING,
        defaultValue: 'http://everyrole.com/media/individual/project/cover/default.png'
    }
});

Product.prototype.isAvailable = function() {
   return this.stock ? true : false;
}

module.exports = Product;