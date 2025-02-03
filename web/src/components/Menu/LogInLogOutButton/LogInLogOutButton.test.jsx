import { render } from '@redwoodjs/testing/web'

import LogInLogOutButton from './LogInLogOutButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LogInLogOutButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LogInLogOutButton />)
    }).not.toThrow()
  })
})
