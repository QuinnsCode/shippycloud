import { render } from '@redwoodjs/testing/web'

import WebhookEventLogsOfAnOrgStream from './WebhookEventLogsOfAnOrgStream'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WebhookEventLogsOfAnOrgStream', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WebhookEventLogsOfAnOrgStream />)
    }).not.toThrow()
  })
})
