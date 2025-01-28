import { render } from '@redwoodjs/testing/web'

import AddingOrgForm from './AddingOrgForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddingOrgForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddingOrgForm />)
    }).not.toThrow()
  })
})
