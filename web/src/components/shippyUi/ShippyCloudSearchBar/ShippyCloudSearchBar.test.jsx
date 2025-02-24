import { render } from '@redwoodjs/testing/web'

import ShippyCloudSearchBar from './ShippyCloudSearchBar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShippyCloudSearchBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShippyCloudSearchBar />)
    }).not.toThrow()
  })
})
