import { render } from '@redwoodjs/testing/web'

import LogIn from './LogIn'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LogIn', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LogIn />)
    }).not.toThrow()
  })
})
