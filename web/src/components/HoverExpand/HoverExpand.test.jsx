import { render } from '@redwoodjs/testing/web'

import HoverExpand from './HoverExpand'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('HoverExpand', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HoverExpand />)
    }).not.toThrow()
  })
})
