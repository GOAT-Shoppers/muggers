const router = require('express').Router();
const { Order, LineItem } = require('../db/models');

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
router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId, { include: {
        model: LineItem,
        where: {
            orderId: req.params.orderId
        }}})
        .then(orders => res.json(orders))
        .catch(next);

});

//UPDATE ORDER BY ID
router.put('/:orderId', (req, res, next) => {
    Order.update(req.body, {
        where: { id: req.params.orderId },
        returning: true
        })
    .then(order => res.json(order))
    .catch(next);
})

