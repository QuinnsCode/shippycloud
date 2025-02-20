import { render } from '@redwoodjs/testing/web'

import OrganizationOfAUserLandingAfterLogin from './OrganizationOfAUserLandingAfterLogin'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrganizationOfAUserLandingAfterLogin', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationOfAUserLandingAfterLogin />)
    }).not.toThrow()
  })
})
