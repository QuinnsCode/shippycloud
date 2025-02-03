import { render } from '@redwoodjs/testing/web'

import MasterNav from './MasterNav'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MasterNav', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MasterNav />)
    }).not.toThrow()
  })
})
