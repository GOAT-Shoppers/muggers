const router = require('express').Router();
const { User, Order, LineItem, Address, Product } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
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
      userId: req.params.id,
    },
  include: [{
      model: LineItem}]
  })
    .then(instanceArr => instanceArr[0])
    .then(order => res.json(order))
    .catch(next)
})


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

router.get('/:id/cart', (req, res, next) => {
  if (req.user){
    User.findById(req.params.id)
      .then(user => {
        Order.findOrCreate({
          where: {
            userId: req.params.id,
            status: 'shopping'
          }, defaults: {
            userId: req.params.id,
            status: 'shopping',
            email: user.email
          },
          include: [{
            model: LineItem,
            include: Product
          }, Address]
        })
          .then(instanceArr => instanceArr[0])
          .then(order => res.json(order))
          .catch(next)
      })
      .catch(next)
  } else {
    return req.session.cart
  }
})

