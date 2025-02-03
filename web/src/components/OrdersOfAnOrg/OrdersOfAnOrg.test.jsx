import { render } from '@redwoodjs/testing/web'

import OrdersOfAnOrg from './OrdersOfAnOrg'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrdersOfAnOrg', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrdersOfAnOrg />)
    }).not.toThrow()
  })
})
