import { render } from '@redwoodjs/testing/web'

import SignIn from './SignIn'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SignIn', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignIn />)
    }).not.toThrow()
  })
})
