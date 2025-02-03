import { render } from '@redwoodjs/testing/web'

import ShippyCloudLogo from './ShippyCloudLogo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShippyCloudLogo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShippyCloudLogo />)
    }).not.toThrow()
  })
})
