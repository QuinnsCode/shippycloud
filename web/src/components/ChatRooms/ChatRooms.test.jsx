import { render } from '@redwoodjs/testing/web'

import ChatRooms from './ChatRooms'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChatRooms', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChatRooms />)
    }).not.toThrow()
  })
})
