import React from 'react'
import Router from './Router'

describe('<Router />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Router />)
  })
})