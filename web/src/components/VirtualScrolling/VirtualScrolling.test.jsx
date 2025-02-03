import { render } from '@redwoodjs/testing/web'

import VirtualScrolling from './VirtualScrolling'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('VirtualScrolling', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VirtualScrolling />)
    }).not.toThrow()
  })
})
