const router = require('express').Router();
const { User, Order, LineItem, Address } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['lastName', 'firstName', 'id', 'email', 'isAdmin']
  })
    .then(users => res.json(users))
    .catch(next);
})

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  User.findOne({
    attributes: ['lastName', 'firstName', 'id', 'email', 'isAdmin'],
    where: {
      id: req.params.id
    }
  })
    .then(user => res.json(user))
    .catch(next);
});

router.get('/:id/orders', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.id
    },
    include: { model: LineItem }
  })
    .then(orders => res.json(orders))
    .catch(next);
});

router.get('/:id/addresses', (req, res, next) => {
  Address.findAll({
    where: {
      userId: req.params.id
    }
  })
    .then(addresses => res.json(addresses))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then(newUser => res.json(newUser))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(204).end())
    .catch(next);
});
