import { render } from '@redwoodjs/testing/web'

import SignUpLogIn from './SignUpLogIn'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SignUpLogIn', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignUpLogIn />)
    }).not.toThrow()
  })
})
