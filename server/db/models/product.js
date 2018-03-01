const Sequelize = require('sequelize');
const db = require('../db');
const Review = ('./review');

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

Product.prototype.averageRating = async function() {
  let average = await function (){
    this.getReviews()
      .then(reviews => reviews.map(el => el.getDataValue('rating')))
      .then(arrayOfRating => {
        const divisor = arrayOfRating.length;
        const total = arrayOfRating.reduce((acc, el) => {
          acc += el
          return acc;
        }, 0)
        average = total / divisor;
      })
  }
  return average
}

module.exports = Product;
