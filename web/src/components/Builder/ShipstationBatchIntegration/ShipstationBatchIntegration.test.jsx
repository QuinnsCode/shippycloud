import { render } from '@redwoodjs/testing/web'

import ShipstationBatchIntegration from './ShipstationBatchIntegration'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShipstationBatchIntegration', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShipstationBatchIntegration />)
    }).not.toThrow()
  })
})
