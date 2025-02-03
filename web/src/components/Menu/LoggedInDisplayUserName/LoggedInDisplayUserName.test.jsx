import { render } from '@redwoodjs/testing/web'

import LoggedInDisplayUserName from './LoggedInDisplayUserName'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LoggedInDisplayUserName', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoggedInDisplayUserName />)
    }).not.toThrow()
  })
})
