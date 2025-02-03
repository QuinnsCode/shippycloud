import { render } from '@redwoodjs/testing/web'

import ShippyCloudPageHeader from './ShippyCloudPageHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShippyCloudPageHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShippyCloudPageHeader />)
    }).not.toThrow()
  })
})
