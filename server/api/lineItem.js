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

router.post('/', (req, res, next) => {
  LineItem.create(req.body)
    .then(lineItem => res.json(lineItem))
    .catch(next)
})

module.exports = router;
