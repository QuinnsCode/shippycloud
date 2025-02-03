import gql from 'graphql-tag'

import { context } from '@redwoodjs/graphql-server'

export const schema = gql`
  type Subscription {
    onWebhookReceived(organizationId: String!): WebhookEventLog! @requireAuth
  }
`

const onWebhookReceived = {
  onWebhookReceived: {
    subscribe: (_, { organizationId }, contextArg) => {
      console.group('Subscription Debug')
      console.log('Raw context:', contextArg)
      console.log('Global context:', context)

      // Try to use context from argument or global context
      const pubSubToUse = contextArg?.pubSub || context?.pubSub

      if (!pubSubToUse) {
        console.error('PubSub not found in context')
        throw new Error('PubSub not initialized')
      }

      console.log('Subscribing to org:', organizationId)
      const subscription = pubSubToUse.subscribe(
        'onWebhookReceived',
        organizationId
      )

      console.groupEnd()
      return subscription
    },
    resolve: (payload) => {
      console.log('Resolve called with event:', payload)
      return payload
    },
  },
}

export default onWebhookReceived
