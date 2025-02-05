import { render } from '@redwoodjs/testing/web'

import ShippyCloudColorfulBackground from './ShippyCloudColorfulBackground'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShippyCloudColorfulBackground', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShippyCloudColorfulBackground />)
    }).not.toThrow()
  })
})
