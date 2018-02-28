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
    where: { productid: req.params.productId },
    include: [{ model: Review }]
  })
    .then(products => res.send(products))
    .catch(next)
})


router.delete('/:productId', function (req, res, next) {
  Product.destroy({ where: { id: req.params.productId } })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.put('/:productId', function (req, res, next) {
  Product.findById(req.params.id)
    .then(function (product) {
      return product.update(req.body)
    })
    .then(function (updatedProduct) {
      res.send(updatedProduct)
    })
    .catch(next)
})

router.post('/', function (req, res, next) {
  Product.create({
    name: req.body.name,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.price,
    photo: req.body.imgUrl || 'http://everyrole.com/media/individual/project/cover/default.png'
  })
    .then(product => res.send(product))
    .catch(next)
})

module.exports = router;

