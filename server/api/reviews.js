const router = require('express').Router();
const {Review} = require('../db/models');

router.get('/:prodId', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.prodId
    }
  })
  .then(review => res.json(review))
  .catch(next)
})

//i realized that we wouldn't post to '/:prodId' like we have in our ticket, we would just post to '/' because we don't have a product ID at time of creation
router.post('/', (req, res, next) => {
  Review.create(req.body)
  .then(review => res.json(review))
  .catch(next)
})


router.put('/:prodId/:reviewId', (req, res, next) => {
  Review.findById(req.params.reviewId)
  .then(review => review.update(req.body))
  .then(updatedReview => res.json(updatedReview))
  .catch(next)
})

router.delete('/:prodId/:reviewId', (req, res, next) => {
  Review.delete({
    where: {
      id: req.params.reviewId
    }
  })
  .then(res.send(204).end())
  .catch(next)
})

module.exports = router;
