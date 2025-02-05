import { render } from '@redwoodjs/testing/web'

import ShippyCloudBanner from './ShippyCloudBanner'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShippyCloudBanner', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShippyCloudBanner />)
    }).not.toThrow()
  })
})
