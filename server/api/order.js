const router = require('express').Router();
const { Order, LineItem, Address } = require('../db/models');

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
  Order.findById(req.params.id, { include: [LineItem, Address] })
      .then(orders => res.json(orders))
      .catch(next);
});

//UPDATE ORDER BY ID
router.put('/:orderId', (req, res, next) => {
  return Order.update(req.body, {
      where: { id: req.params.orderId }
      })
  .then(order => res.json(order))
  .catch(next);
})

