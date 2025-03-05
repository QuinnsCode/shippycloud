import { render } from '@redwoodjs/testing/web'

import ShipderList from './ShipderList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShipderList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShipderList />)
    }).not.toThrow()
  })
})
