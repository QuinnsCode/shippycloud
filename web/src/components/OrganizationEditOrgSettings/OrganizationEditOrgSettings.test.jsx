import { render } from '@redwoodjs/testing/web'

import OrganizationEditOrgSettings from './OrganizationEditOrgSettings'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrganizationEditOrgSettings', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationEditOrgSettings />)
    }).not.toThrow()
  })
})
