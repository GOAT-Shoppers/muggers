const router = require('express').Router();
const { Order, LineItem, Address, Product } = require('../db/models');
const { isLoggedIn, makeError, isAdmin } = require('./utility')

module.exports = router;

router.get('/', (req, res, next) => {
  if (!req.user) {
    return res.json({})
  } else if (req.user && req.user.isAdmin){
    Order.findAll()
      .then(orders => res.json(orders))
      .catch(next);
  }
});

router.post('/', (req, res, next) => {
  Order.create(req.body)
      .then(order => res.json(order))
      .catch(next);
});

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, { include: [{
    model: LineItem,
    include: Product
  }, Address] })
      .then(orders => res.json(orders))
      .catch(next);
});

router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(updatedOrder => res.json(updatedOrder))
    .catch(next);
});
