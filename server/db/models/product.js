const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    photo: {
        type: Sequelize.STRING,
        defaultValue: 'http://everyrole.com/media/individual/project/cover/default.png'
    }
});

Product.prototype.isAvailable = function() {
   return !!this.stock;
}

Product.prototype.displayPrice = function(){
    return this.price / 100;
}

//Instance method that calcs average rating ???

module.exports = Product;
