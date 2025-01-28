import { render } from '@redwoodjs/testing/web'

import OrganizationSettings from './OrganizationSettings'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrganizationSettings', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationSettings />)
    }).not.toThrow()
  })
})
