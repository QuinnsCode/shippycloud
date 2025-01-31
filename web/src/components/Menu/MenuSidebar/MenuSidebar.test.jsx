import { render } from '@redwoodjs/testing/web'

import MenuSidebar from './MenuSidebar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MenuSidebar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MenuSidebar />)
    }).not.toThrow()
  })
})
