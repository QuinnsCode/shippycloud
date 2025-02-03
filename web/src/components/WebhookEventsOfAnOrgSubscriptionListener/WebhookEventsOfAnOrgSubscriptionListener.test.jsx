import { render } from '@redwoodjs/testing/web'

import WebhookEventsOfAnOrgSubscriptionListener from './WebhookEventsOfAnOrgSubscriptionListener'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WebhookEventsOfAnOrgSubscriptionListener', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WebhookEventsOfAnOrgSubscriptionListener />)
    }).not.toThrow()
  })
})
