import { render } from '@redwoodjs/testing/web'

import NewUserFlow from './NewUserFlow'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewUserFlow', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewUserFlow />)
    }).not.toThrow()
  })
})
