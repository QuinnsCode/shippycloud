import { render } from '@redwoodjs/testing/web'

import ShippyMenuSidebarIconList from './ShippyMenuSidebarIconList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShippyMenuSidebarIconList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShippyMenuSidebarIconList />)
    }).not.toThrow()
  })
})
