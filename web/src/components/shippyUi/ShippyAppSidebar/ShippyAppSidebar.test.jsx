import { render } from '@redwoodjs/testing/web'

import ShippyAppSidebar from './ShippyAppSidebar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShippyAppSidebar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShippyAppSidebar />)
    }).not.toThrow()
  })
})
