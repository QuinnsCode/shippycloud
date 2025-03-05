import { render } from '@redwoodjs/testing/web'

import OrganizationAddAMemberWidget from './OrganizationAddAMemberWidget'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrganizationAddAMemberWidget', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationAddAMemberWidget />)
    }).not.toThrow()
  })
})
