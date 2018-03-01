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
    .then(products => res.json(products))
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

router.get('/:id/holymoly', (req,res,next) => {
  Product.findById(req.params.id)
  .then(
    prod => {console.log('This is what we care about:',prod.averageRating())
    res.sendStatus(200);}
  )
})

module.exports = router;
