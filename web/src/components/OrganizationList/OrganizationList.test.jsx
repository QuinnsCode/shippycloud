import { render } from '@redwoodjs/testing/web'

import OrganizationList from './OrganizationList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrganizationList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationList />)
    }).not.toThrow()
  })
})
