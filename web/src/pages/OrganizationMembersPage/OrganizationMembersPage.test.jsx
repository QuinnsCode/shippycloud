import { render } from '@redwoodjs/testing/web'

import OrganizationMembersPage from './OrganizationMembersPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('OrganizationMembersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationMembersPage />)
    }).not.toThrow()
  })
})
