const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.post('/', (req, res, next) => {
  User.findOrCreate(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  User.findOne({
    attributes: ['id', 'email'],
    where: {
      id: req.params.userId
    }
  })
    .then(user => res.json(user))
    .catch(next)
})

router.put('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.update(req.body))
    .then(newUser => res.json(newUser))
    .catch(next)
})

router.delete('/:userId', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.userId
    }
  })
  .then(() => res.status(204).end())
  .catch(next)
})
