const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmpty: false //missing validation wrapper???
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        isEmpty: false //missing validation wrapper???
    },
    price: {
        type: Sequelize.DECIMAL, //change to integer
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0 //include validation for neg nums
    },
    photo: {
        type: Sequelize.STRING,
        defaultValue: 'http://everyrole.com/media/individual/project/cover/default.png'
    }
});

Product.prototype.isAvailable = function() {
   return this.stock ? true : false; //return !!this.stock === this line
}

//Instance method that calcs average rating ???

module.exports = Product;
