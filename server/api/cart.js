const router = require('express').Router();

// console.log(req.session.cart)
// console.log(req.session.passport.user)
router.get('/', (req, res, next) => {
  res.json(req.session.cart)
});

router.post('/', (req, res, next) => {
  if (!req.session.user) {
    if (req.session.cart) {
      req.session.cart.push(req.body)
    } else {
      req.session.cart = []
    }
  }
  res.json(req.session.cart)
});

// This route can ONLY change the quantity on a line item of a guest session
router.put('/:id', (req, res, next) => {
  let quantity = req.body.quantity
  let cart = req.session.cart
  let match = cart.find(lineItem => lineItem.productId === req.params.id * 1)
  let index = req.session.cart.indexOf(match)

  req.session.cart.splice(index, 1)
  match.quantity = quantity
  req.session.cart.push(match)
  res.json(req.session.cart)
})

router.delete('/:id', (req, res, next) => {
  let cart = req.session.cart
  let match = cart.find(lineItem => lineItem.productId === req.params.id * 1)
  let index = req.session.cart.indexOf(match)
  req.session.cart.splice(index, 1)

  res.json(req.session.cart)
});

router.delete('/', (req, res, next) => {
  req.session.cart = []
  res.json(req.session.cart)
});

module.exports = router;
