import { render } from '@redwoodjs/testing/web'

import Todo from './Todo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Todo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Todo />)
    }).not.toThrow()
  })
})
