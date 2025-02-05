import { render } from '@redwoodjs/testing/web'

import OrganizationMemberList from './OrganizationMemberList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrganizationMemberList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationMemberList />)
    }).not.toThrow()
  })
})
