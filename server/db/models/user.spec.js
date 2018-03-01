/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          firstName: 'Cody',
          lastName: 'Puppy',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
     })
    
    describe('fullName', () => {
      let gabby

      beforeEach(() => {
        return User.create({
          firstName: 'Gabby',
          lastName: 'Jose',
          email: 'gabby@me.com',
          password: 'avocado'
        })
        .then(user => {
          gabby = user
        })
      })

      it('returns user\'s full name', ()=> {
        expect(gabby.fullName).to.be.equal('Gabby Jose')
      })
    })
    // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')