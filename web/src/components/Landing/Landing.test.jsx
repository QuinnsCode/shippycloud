import { render } from '@redwoodjs/testing/web'

import Landing from './Landing'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Landing', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Landing />)
    }).not.toThrow()
  })
})
