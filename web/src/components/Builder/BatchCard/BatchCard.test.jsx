import { render } from '@redwoodjs/testing/web'

import BatchCard from './BatchCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BatchCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BatchCard />)
    }).not.toThrow()
  })
})
