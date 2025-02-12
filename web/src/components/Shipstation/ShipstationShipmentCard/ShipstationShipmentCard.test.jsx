import { render } from '@redwoodjs/testing/web'

import ShipstationShipmentCard from './ShipstationShipmentCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShipstationShipmentCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShipstationShipmentCard />)
    }).not.toThrow()
  })
})
