// WebhookEventLogsOfAnOrg component
import { useState, useEffect } from 'react'

import { useSubscription } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'

import ShippyWebhookEventCard from 'src/components/shippyUi/ShippyWebhookEventCard/ShippyWebhookEventCard'

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

const WebhookEventLogsOfAnOrg = ({
  webhookEventLogsOfAnOrg,
  organizationId,
}) => {
  const [webhookLogs, setWebhookLogs] = useState(webhookEventLogsOfAnOrg || [])

  const { data, loading, error } = useSubscription(
    ORGANIZATION_WEBHOOK_SUBSCRIPTION,
    {
      variables: { organizationId },
      onData: ({ data }) => {
        console.log('Subscription onData received:', data)
        const newWebhookLog = data?.onWebhookReceived

        if (newWebhookLog) {
          console.log('New webhook log received:', newWebhookLog)

          // Prevent duplicates
          setWebhookLogs((prevLogs) => {
            const exists = prevLogs.some((log) => log.id === newWebhookLog.id)
            return exists ? prevLogs : [...prevLogs, newWebhookLog]
          })
        }
      },
    }
  )

  console.log({ data })

  return (
    <div className="w-full bg-white">
      {webhookLogs?.map((event, index) => (
        <ShippyWebhookEventCard
          key={event.id}
          index={index}
          event={event.event}
          payload={event.payload}
          source={event.source}
        />
      ))}
    </div>
  )
}

export default WebhookEventLogsOfAnOrg
