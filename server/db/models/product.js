const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
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
    return (this.price/100).toFixed(2);
}

//Instance method that calcs average rating ???

module.exports = Product;
