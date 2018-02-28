import { mapLogin } from './auth-form'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

describe('Auth Form', () => {
  describe('the mapLogin function', () => {
    let fakeState = {
      name: 'login',
      displayName: 'Login',
      user: {
        error: 'Hi I am an Error'
      }
    }

    it('should return a login object', () => {
      expect(mapLogin(fakeState).error).to.be.equal('Hi I am an Error')
    })

  })
})
