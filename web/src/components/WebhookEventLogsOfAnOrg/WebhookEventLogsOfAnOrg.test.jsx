import { render } from '@redwoodjs/testing/web'

import WebhookEventLogsOfAnOrg from './WebhookEventLogsOfAnOrg'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WebhookEventLogsOfAnOrg', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WebhookEventLogsOfAnOrg />)
    }).not.toThrow()
  })
})
