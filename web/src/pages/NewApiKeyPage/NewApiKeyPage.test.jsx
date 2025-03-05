import { render } from '@redwoodjs/testing/web'

import NewApiKeyPage from './NewApiKeyPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewApiKeyPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewApiKeyPage />)
    }).not.toThrow()
  })
})
