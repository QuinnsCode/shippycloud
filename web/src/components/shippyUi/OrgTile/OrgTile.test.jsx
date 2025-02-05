import { render } from '@redwoodjs/testing/web'

import OrgTile from './OrgTile'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrgTile', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrgTile />)
    }).not.toThrow()
  })
})
