
const { expect } = require('chai')
const db = require('../index')
const Product = require('./product')
const Review = require('./review')
const LineItem = require('./lineItem')
const Order = require('./order')
const Category = require('./category')

// before('Await database sync', () => db.didSync)
// afterEach('Clear the tables', () => db.truncate({ cascade: true }))

// describe('Order Models', () => {
//   let order;

//   before('create order', function () { order = Order.create() })
//   it('require email', () => {
//     return order
//       .then(() => { throw new Error('Promise should have rejected'); })
//       .catch(err => {
//         expect(err).to.be.an('object');
//         expect(err.errors).to.contain.a.thing.with.properties({
//           path: 'email',
//           type: 'notNull Violation'
//         });
//       });
//   })
// })


describe('Order', () => {
  describe('Attributes', () => {
    const { attributes } = Order;
    it('Has attributes as expected', () => {
      expect(attributes.email).to.be.a('object');
      expect(attributes.status).to.be.a('object');
    });

    describe('email attribute', () => {
      const { attributes: { email } } = Order;
      it('Validates email', () => {
        expect(email.validate.isEmail).to.be.eql(true)
      });
    });
    describe('Status attribute', () => {
      const { attributes: { status} } = Order;
      it('Has a default value which is shopping', () => {
        expect(status.defaultValue).to.be.eql('shopping');
      });
    });
  })
})

describe('Review', () => {
  describe('Attributes', () => {
    const { attributes } = Review;
    it('Has attributes as expected', () => {
      expect(attributes.text).to.be.a('object');
      expect(attributes.rating).to.be.a('object');
    });
    describe('rating attribute', () => {
      let currentReview;
      beforeEach(() => {
        return Review.create({
          text: 'This is great!',
          rating: 3
        })
          .then(review => {
            currentReview = review
          })
      })
      it('Returns the rating we expect', () => {
        expect(currentReview.rating).to.equal(3);
      });
    });
 })
})

describe('Category', () => {
  describe('Attributes', () => {
    const { attributes } = Category;
    it('Has attributes as expected', () => {
      expect(attributes.name).to.be.a('object');
    });
  })
})

describe('LineItem', () => {
  describe('Attributes', () => {
    const { attributes } = LineItem;
    it('Has attributes as expected', () => {
      expect(attributes.quantity).to.be.a('object');
      expect(attributes.price).to.be.a('object');
    });
  })
})

describe('Product', () => {
  describe('Attributes', () => {
    const { attributes } = Product;
    it('Has attributes as expected', () => {
      expect(attributes.name).to.be.a('object');
      expect(attributes.description).to.be.a('object');
      expect(attributes.price).to.be.a('object');
      expect(attributes.stock).to.be.a('object');
      expect(attributes.photo).to.be.a('object');
    });
  })
})

  