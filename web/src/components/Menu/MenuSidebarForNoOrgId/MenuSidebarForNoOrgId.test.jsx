import { render } from '@redwoodjs/testing/web'

import MenuSidebarForNoOrgId from './MenuSidebarForNoOrgId'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MenuSidebarForNoOrgId', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MenuSidebarForNoOrgId />)
    }).not.toThrow()
  })
})
