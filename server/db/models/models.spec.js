
const { expect } = require('chai')
const db = require('../index');
const { User, Order, LineItem, Review, Product, Address, Category } = require('./index')

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
  describe('instance methods', () => {
    let currentOrder;
    beforeEach(()=> {
      return Product.create({
        name: "Thing",
        description: "So descriptive!",
        price: 299
      })
    //   .then(createdOrder =>
    //     {
    //       currentOrder = createdOrder
    //       Review.create({
    //         productId: currentOrder.id,
    //         rating: 4
    //       })
    //       Review.create({
    //         productId: currentOrder.id,
    //         rating: 3
    //       })
    //       Review.create({
    //         productId: currentOrder.id,
    //         rating: 5
    //       })
    //     }
    //   )
    })

    it('is available displays the current stock', () => {
      expect(currentOrder.isAvailable()).to.eql(false)
    })

    xit('full price displays price in decimals', () => {
      expect(currentOrder.displayPrice()).to.eql(2.99)
    })

    xit('reviews calculates average rating', () => {
      expect(currentOrder.averageRating()).to.be.an('number');
    })
  })
})
describe('Address model', ()=> {
  describe('Instance methods', () => {
    let place;
    beforeEach(() => {

      return Address.create({
        street: '12 Somewhere st',
        state: 'New York',
        city: 'Buffalo',
        zip: '12345'
      })
        .then(address => {
          place = address
        })
    })

    it('return full address', () => {
      expect(place.fullAddress()).to.be.equal('12 Somewhere st\nBuffalo, New York\n12345')
    })
  })
})
