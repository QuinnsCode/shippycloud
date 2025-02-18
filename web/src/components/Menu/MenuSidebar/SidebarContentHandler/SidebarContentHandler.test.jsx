import { render } from '@redwoodjs/testing/web'

import SidebarContentHandler from './SidebarContentHandler'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SidebarContentHandler', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SidebarContentHandler />)
    }).not.toThrow()
  })
})
