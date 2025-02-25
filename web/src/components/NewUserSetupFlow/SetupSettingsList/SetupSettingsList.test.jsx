import { render } from '@redwoodjs/testing/web'

import SetupSettingsList from './SetupSettingsList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SetupSettingsList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SetupSettingsList />)
    }).not.toThrow()
  })
})
