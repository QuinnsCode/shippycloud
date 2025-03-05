// web/src/components/WebhookListener/WebhookListener.js
import { useEffect } from 'react'

import { toast } from 'sonner'

import { useSubscription } from '@redwoodjs/web'
// import { toast } from '@redwoodjs/web/toast'

const ORGANIZATION_WEBHOOK_SUBSCRIPTION = gql`
  subscription OnWebhookReceived($organizationId: String!) {
    onWebhookReceived(organizationId: $organizationId) {
      id
      event
      source
      payload
      createdAt
    }
  }
`

const WebhookEventsOfAnOrgSubscriptionListener = ({ organizationId }) => {
  const { data, loading, error } = useSubscription(
    ORGANIZATION_WEBHOOK_SUBSCRIPTION,
    {
      variables: { organizationId },
      onData: (data) => {
        console.log('Subscription onData received:', data)
      },
      onCompleted: ({ data }) => {
        console.log('Subscription onCompleted received:', data)
      },
      onError: (error) => {
        console.error('Subscription onError:', error)
      },
    }
  )
  // Keep your existing useEffects but add more logging
  useEffect(() => {
    console.log('Loading state:', loading)
    console.log('Error state:', error)
    console.log('Current data:', data)
  }, [loading, error, data])
  useEffect(() => {
    console.log('WebhookListener mounted for org:', organizationId)
    return () => console.log('WebhookListener unmounted')
  }, [])

  useEffect(() => {
    console.log('Subscription data changed:', data)

    if (data?.onWebhookReceived) {
      console.log('Processing webhook:', data.onWebhookReceived)

      try {
        const { event, source, payload } = data.onWebhookReceived
        const parsedPayload = payload ? JSON.parse(payload) : null

        toast.success(`New webhook: ${event} from ${source}`)
        console.log('Parsed payload:', parsedPayload)
      } catch (e) {
        console.error('Error processing webhook:', e)
        toast.error('New webhook received but failed to parse payload')
      }
    }
  }, [data])

  if (loading) {
    console.log('Subscription loading...')
  }

  if (error) {
    console.error('Webhook subscription error:', error)
    return null
  }

  return null
}

export default WebhookEventsOfAnOrgSubscriptionListener
