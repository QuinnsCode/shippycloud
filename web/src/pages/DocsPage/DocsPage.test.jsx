import { render } from '@redwoodjs/testing/web'

import DocsPage from './DocsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DocsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DocsPage />)
    }).not.toThrow()
  })
})
