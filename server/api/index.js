const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/products', require('./product'));
router.use('/categories', require('./category'));
router.use('/reviews', require('./reviews'));
router.use('orders', require('/order'));
router.use('/lineitems', require('/lineItem'));
router.use('addresses', require('/address'));


router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
