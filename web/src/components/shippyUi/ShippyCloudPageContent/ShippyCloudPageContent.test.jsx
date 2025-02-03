import { render } from '@redwoodjs/testing/web'

import ShippyCloudPageContent from './ShippyCloudPageContent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShippyCloudPageContent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShippyCloudPageContent />)
    }).not.toThrow()
  })
})
