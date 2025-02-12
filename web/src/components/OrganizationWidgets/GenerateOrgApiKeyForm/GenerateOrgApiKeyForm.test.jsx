import { render } from '@redwoodjs/testing/web'

import GenerateOrgApiKeyForm from './GenerateOrgApiKeyForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GenerateOrgApiKeyForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GenerateOrgApiKeyForm />)
    }).not.toThrow()
  })
})
