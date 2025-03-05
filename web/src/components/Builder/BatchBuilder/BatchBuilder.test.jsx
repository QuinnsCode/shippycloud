import { render } from '@redwoodjs/testing/web'

import BatchBuilder from './BatchBuilder'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BatchBuilder', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BatchBuilder />)
    }).not.toThrow()
  })
})
