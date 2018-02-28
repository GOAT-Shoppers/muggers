const router = require('express').Router()
const { Product, Review, Category} = require('../db/models')

router.param('productId', function (req, res, next, productId) {
  Product.findById(productId)
    .then(product => {
      req.product = product;
      next()
    })
})

router.get('/', function (req, res, next) {
  Product.findAll({
    include: [{
      model: Category
    }]
  })
    .then(products => res.send(products))
    .catch(next)
})


router.get('/:productId', function (req, res, next) {
  Product.findAll({
    where: { id: req.product},
    include: [{ model: Review }]
  })
    .then(products => res.send(products))
    .catch(next)
})


router.delete('/:productId', function (req, res, next) {
  Product.destroy({ where: { id: req.product } })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.put('/:productId', function (req, res, next) {
  Product.findById(req.params.productId)
    .then(function (product) {
      return product.update(req.body)
    })
    .then(function (updatedProduct) {
      res.send(updatedProduct)
    })
       .catch(next)
})

router.post('/', function (req, res, next) {
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(next)
})

module.exports = router;