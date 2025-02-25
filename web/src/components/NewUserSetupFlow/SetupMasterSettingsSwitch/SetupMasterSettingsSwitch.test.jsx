import { render } from '@redwoodjs/testing/web'

import SetupMasterSettingsSwitch from './SetupMasterSettingsSwitch'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SetupMasterSettingsSwitch', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SetupMasterSettingsSwitch />)
    }).not.toThrow()
  })
})
