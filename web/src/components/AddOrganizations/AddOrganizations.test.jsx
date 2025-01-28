import { render } from '@redwoodjs/testing/web'

import AddOrganizations from './AddOrganizations'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddOrganizations', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddOrganizations />)
    }).not.toThrow()
  })
})
