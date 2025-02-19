import { render } from '@redwoodjs/testing/web'

import PostHogTestButton from './PostHogTestButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PostHogTestButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PostHogTestButton />)
    }).not.toThrow()
  })
})
