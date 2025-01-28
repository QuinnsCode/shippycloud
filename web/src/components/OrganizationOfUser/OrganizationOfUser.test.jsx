import { render } from '@redwoodjs/testing/web'

import OrganizationOfUser from './OrganizationOfUser'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrganizationOfUser', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationOfUser />)
    }).not.toThrow()
  })
})
