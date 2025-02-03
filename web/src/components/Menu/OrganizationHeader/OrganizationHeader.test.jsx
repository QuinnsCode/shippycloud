import { render } from '@redwoodjs/testing/web'

import OrganizationHeader from './OrganizationHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrganizationHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationHeader />)
    }).not.toThrow()
  })
})
