const router = require('express').Router();
const { Review, User } = require('../db/models');

router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Review.findById(req.params.id, {
    include: { model: User }
  })
    .then(review => res.json(review))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.json(review))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => review.update(req.body))
    .then(updatedReview => res.json(updatedReview))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Review.destroy({ where: { id: req.params.id }})
    .then(res.sendStatus(204))
    .catch(next);
});

module.exports = router;
