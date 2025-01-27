import { render } from '@redwoodjs/testing/web'

import OrganizationWidget from './OrganizationWidget'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrganizationWidget', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationWidget />)
    }).not.toThrow()
  })
})
