const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/product', require('./product')); //pluralize
router.use('/category', require('./category')); //pluralize
router.use('/reviews', require('./reviews')); //pluralize

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
