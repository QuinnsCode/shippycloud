import { render } from '@redwoodjs/testing/web'

import OrganizationMembers from './OrganizationMembers'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrganizationMembers', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationMembers />)
    }).not.toThrow()
  })
})
