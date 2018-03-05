const router = require('express').Router()
const { LineItem, Product } = require('../db/models')

router.get('/', (req, res, next) => {
  LineItem.findAll({
  include: { model: Product }
})
  .then((item) => {
    res.send(item)
  })
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then((item) => {
      res.send(item)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  LineItem.create(req.body)
    .then(lineItem => res.json(lineItem))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => lineItem.update(req.body))
    .then(updatedLineItem => res.json(updatedLineItem))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  LineItem.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(204).end())
    .catch(next)
})


module.exports = router;
