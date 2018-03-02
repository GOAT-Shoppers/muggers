const router = require('express').Router();
const { Address } = require('../db/models');

router.get('/', (req, res, next) => {
  Address.findAll()
    .then(addresses => res.json(addresses))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Address.create(req.body)
    .then(address => res.json(address))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  return Address.update(req.body, {
    where: { id: req.params.id }
  })
    .then(address => res.json(address))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Address.destroy({ where: { id: req.params.id }})
    .then(res.sendStatus(204))
    .catch(next);
});

module.exports = router;

