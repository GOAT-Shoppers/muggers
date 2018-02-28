const router = require('express').Router()
const { LineItem } = require('../db/models')

router.get('/', function(req, res, next){
  LineItem.findAll()
  .then((item) => {
    res.send(item)
  })
  .catch(next)
})

router.post('/', function(req, res, next){
  LineItem.create({
    quantity: req.body.quantity,
    price: req.body.price
  })
  .catch(next)
})

module.exports = router;
