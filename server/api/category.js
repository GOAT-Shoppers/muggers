const router = require('express').Router();
const { Category, Product } = require('../db/models');

router.get('/', (req, res, next) => {
  Category.findAll({ include: [ Product ]})
    .then(category => res.json(category))
    .catch(next)
});

router.post('/', (req, res, next) => {
  Category.create({
    name: req.body.name
  })
  .then(category => res.json(category))
  .catch(next)
});

// router.get('/:id', (req, res, next) => { 
//   Category.findAll({
//     where: { id: req.params.id },
//     include: [{ model: Product }]
//   })
//   .then(category => res.json(category))
//   .catch(next)
// })

module.exports = router;
