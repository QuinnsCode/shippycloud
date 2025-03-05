import { render } from '@redwoodjs/testing/web'

import BatchItemsDisplay from './BatchItemsDisplay'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BatchItemsDisplay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BatchItemsDisplay />)
    }).not.toThrow()
  })
})
