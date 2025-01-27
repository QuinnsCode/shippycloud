import { render } from '@redwoodjs/testing/web'

import SetupWidget from './SetupWidget'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SetupWidget', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SetupWidget />)
    }).not.toThrow()
  })
})
