import { render } from '@redwoodjs/testing/web'

import ShippyCloudSkyBanner from './ShippyCloudSkyBanner'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShippyCloudSkyBanner', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShippyCloudSkyBanner />)
    }).not.toThrow()
  })
})
