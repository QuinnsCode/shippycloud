import { render } from '@redwoodjs/testing/web'

import StoresPage from './StoresPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('StoresPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StoresPage />)
    }).not.toThrow()
  })
})
