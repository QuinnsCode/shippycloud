import { render } from '@redwoodjs/testing/web'

import WhOrgEventStreamer from './WhOrgEventStreamer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WhOrgEventStreamer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WhOrgEventStreamer />)
    }).not.toThrow()
  })
})
