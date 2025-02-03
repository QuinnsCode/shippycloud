import { render } from '@redwoodjs/testing/web'

import ShippyCloudHeader from './ShippyCloudHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShippyCloudHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShippyCloudHeader />)
    }).not.toThrow()
  })
})
