import { render } from '@redwoodjs/testing/web'

import ShipstationProductCard from './ShipstationProductCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShipstationProductCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShipstationProductCard />)
    }).not.toThrow()
  })
})
