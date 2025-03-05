import { render } from '@redwoodjs/testing/web'

import UserOnboardingFlow from './UserOnboardingFlow'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserOnboardingFlow', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserOnboardingFlow />)
    }).not.toThrow()
  })
})
