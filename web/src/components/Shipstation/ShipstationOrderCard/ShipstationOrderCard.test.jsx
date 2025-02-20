import { render } from '@redwoodjs/testing/web'

import ShipstationOrderCard from './ShipstationOrderCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShipstationOrderCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShipstationOrderCard />)
    }).not.toThrow()
  })
})
