import { render } from '@redwoodjs/testing/web'

import ShippyWebhookEventCard from './ShippyWebhookEventCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShippyWebhookEventCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShippyWebhookEventCard />)
    }).not.toThrow()
  })
})
