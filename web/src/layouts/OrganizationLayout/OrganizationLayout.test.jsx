import { render } from '@redwoodjs/testing/web'

import OrganizationLayout from './OrganizationLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('OrganizationLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationLayout />)
    }).not.toThrow()
  })
})
