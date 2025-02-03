import { render } from '@redwoodjs/testing/web'

import VersionTopRightCorner from './VersionTopRightCorner'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('VersionTopRightCorner', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VersionTopRightCorner />)
    }).not.toThrow()
  })
})
