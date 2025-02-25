import { render } from '@redwoodjs/testing/web'

import NewUserSetupFlow from './NewUserSetupFlow'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewUserSetupFlow', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewUserSetupFlow />)
    }).not.toThrow()
  })
})
