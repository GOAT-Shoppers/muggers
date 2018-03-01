/* global describe beforeEach it */
import {UserHome, mapState} from './user-home';
import { expect } from 'chai';
import enzyme, { shallow }  from 'enzyme';
import React from 'react';
import { mapSignup } from './auth-form';
import Adapter from 'enzyme-adapter-react-16'

const adapter = new Adapter();
enzyme.configure({adapter});

describe('UserHome', () => {

  let userHome;

  beforeEach(() => {
    userHome = shallow(<UserHome email={'cody@email.com'} />);
  });

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com');
  });

  describe('the mapState function', () => {
    let fakeState = { user: {email: 'hello@aol.com'} }
    it('should return an email object', () => {

      expect(mapState(fakeState).email).to.be.equal('hello@aol.com')
    })
  })

})

describe('Auth Form', () => {
  describe('mapSignUp function', () => {
    let fakeState = {
      user: {error: 'You broken!'}
    }

    it('should return state object', () => {
      expect(mapSignup(fakeState).error).to.be.equal('You broken!')
    })

    describe('the plain component', () => {
      let userHome = shallow(<UserHome email={"gabby@me.com"} />);
      it('should render component with the right email', () => {
        expect(userHome.find('h3').text()).to.be.equal('Welcome, gabby@me.com')
      })
    })
  })
})
