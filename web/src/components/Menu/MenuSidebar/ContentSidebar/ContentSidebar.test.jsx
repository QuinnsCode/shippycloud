import { render } from '@redwoodjs/testing/web'

import ContentSidebar from './ContentSidebar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ContentSidebar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ContentSidebar />)
    }).not.toThrow()
  })
})
