import { render } from '@redwoodjs/testing/web'

import LogOut from './LogOut'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LogOut', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LogOut />)
    }).not.toThrow()
  })
})
