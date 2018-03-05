const router = require('express').Router();
const { Order, LineItem, Address, Product } = require('../db/models');

module.exports = router;

//GET ALL ORDERS
router.get('/', (req, res, next) => {
  Order.findAll()
      .then(orders => res.json(orders))
      .catch(next);
});

//POST ORDER NEED TO ADD DEFAULT VALUE OF STATUS AS OPEN
router.post('/', (req, res, next) => {
  Order.create(req.body)
      .then(order => res.json(order))
      .catch(next);
});

//GET ORDER BY ID W/EAGER LOADED LINE ITEMS
router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, { include: [{
    model: LineItem,
    include: Product
  }, Address] })
      .then(orders => res.json(orders))
      .catch(next);
});

//UPDATE ORDER BY ID
router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(updatedOrder => res.json(updatedOrder))
    .catch(next);
});
