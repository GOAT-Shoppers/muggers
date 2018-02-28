const router = require('express').Router();
const {Category, Product} = require('../db/models');

router.get('/', function (req, res, next) {
  Category.findAll()
    .then(category => res.send(category))
    .catch(next)
})

router.post('/', function(req, res, next){
  Category.create({
    name: req.body.name
  })
  .then(category => res.send(category))
  .catch(next)
})

router.get('/:categoryId', function(req, res, next){
  Category.findAll({
    where: { categoryid: req.params.categoryId },
    include: [{ model: Product }]
  })
  .then(category => res.send(category))
  .catch(next)
})

module.exports = router;
