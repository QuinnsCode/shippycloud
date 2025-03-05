import { render } from '@redwoodjs/testing/web'

import ApiKeyForm from './ApiKeyForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ApiKeyForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ApiKeyForm />)
    }).not.toThrow()
  })
})
