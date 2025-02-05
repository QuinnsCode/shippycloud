import { render } from '@redwoodjs/testing/web'

import OrganizationEndpoints from './OrganizationEndpoints'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrganizationEndpoints', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationEndpoints />)
    }).not.toThrow()
  })
})
