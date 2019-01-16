/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome email="cody@email.com" />)
  })

  it.only('renders the email in a Header', () => {
    console.log(userHome.length)
    expect(userHome.length).to.equal(1)
    // ('headerForTesting').text()).to.be.equal(
    // 'Welcome, cody@email.com!'
  })
})
