import { render } from '@redwoodjs/testing/web'

import TodoPage from './TodoPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TodoPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TodoPage />)
    }).not.toThrow()
  })
})
