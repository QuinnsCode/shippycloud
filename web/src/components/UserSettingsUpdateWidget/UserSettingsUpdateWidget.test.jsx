import { render } from '@redwoodjs/testing/web'

import UserSettingsUpdateWidget from './UserSettingsUpdateWidget'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserSettingsUpdateWidget', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserSettingsUpdateWidget />)
    }).not.toThrow()
  })
})
