import { render } from '@redwoodjs/testing/web'

import DraggableCornerButton from './DraggableCornerButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DraggableCornerButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DraggableCornerButton />)
    }).not.toThrow()
  })
})
