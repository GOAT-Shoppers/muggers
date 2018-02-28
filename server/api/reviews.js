const router = require('express').Router();
const {Review} = require('../db/models');

router.get('/:prodId', (req, res, next) => { //should just be /products/:id/reviews? --- should be in products file
  Review.findById(req.params.prodId)
    .then(review => res.json(review))
    .catch(next);
})

//i realized that we wouldn't post to '/:prodId' like we have in our ticket, we would just post to '/' because we don't have a product ID at time of creation
router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.json(review))
    .catch(next);
})


router.put('/id/:reviewId', (req, res, next) => { // Should be /:id
  Review.findById(req.params.reviewId)
    .then(review => review.update(req.body))
    .then(updatedReview => res.json(updatedReview))
    .catch(next);
})

router.delete('/id/:reviewId', (req, res, next) => { // Should be /:id
  Review.delete({   //Should be destroy
    where: {
      id: req.params.reviewId
    }
  })
    .then(res.sendStatus(204)) //Dont need .end()
    .catch(next);
});

module.exports = router;
