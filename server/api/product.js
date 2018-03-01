const router = require('express').Router();
const { Product, Review, Category, User } = require('../db/models');

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
  Product.findOne({
    where: { id: req.params.id },
    include: [{ model: Review }]
  })
    .then(product => {
      return product.averageRating()
    })
    .then(prod => {
      console.log(prod)
      res.json(prod)
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  return Product.update(req.body, { where: { id: req.params.id }})
    .then((updatedProduct) => res.json(updatedProduct))
    .catch(next);
});

router.get('/:id/reviews', (req, res, next) => {
  Review.findAll({
    where: { productId: req.params.id },
    include: { model: User }
  })
    .then(reviews => res.json(reviews))
    .catch(next)
});

module.exports = router;
