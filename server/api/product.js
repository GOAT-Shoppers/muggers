const router = require('express').Router();
const { Product, Review, Category} = require('../db/models');

router.param('productId', function (req, res, next, productId) {
  Product.findById(productId, {
    include: [{ Review }]
  })
    .then(product => {
      req.product = product;
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  Product.findAll({
    include: [{
      model: Category
    }]
  })
    .then(products => res.json(products))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.json(product))
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  Product.findAll({
    where: { id: req.product.id },
    include: [{ model: Review }]
  })
    .then(products => res.json(products))
    .catch(next);
});


router.delete('/:id', (req, res, next) => {
  Product.destroy({ where: { id: req.product.id } })
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  return Product.update(req.body, { where: { id: req.product.id }})
    .then((updatedProduct) => res.json(updatedProduct))
    .catch(next);
});


module.exports = router;
