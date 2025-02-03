import { render } from '@redwoodjs/testing/web'

import ShippyBottomBorder from './ShippyBottomBorder'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShippyBottomBorder', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShippyBottomBorder />)
    }).not.toThrow()
  })
})
