const router = require('express').Router();
const { Review } = require('../db/models');

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.json(review))
    .catch(next);
});


router.put('/:id', (req, res, next) => {
  Review.findById(req.params.reviewId)
    .then(review => review.update(req.body))
    .then(updatedReview => res.json(updatedReview)) //Dont think this will work as expected
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Review.destroy(req.params.id)
    .then(res.sendStatus(204))
    .catch(next);
});

module.exports = router;
