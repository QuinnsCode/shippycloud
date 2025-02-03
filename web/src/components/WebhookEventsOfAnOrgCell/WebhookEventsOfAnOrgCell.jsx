import { useEffect } from 'react'

import WebhookEventLogsOfAnOrg from 'src/components/WebhookEventLogsOfAnOrg/WebhookEventLogsOfAnOrg'
import WebhookEventLogsOfAnOrgStream from 'src/components/WebhookEventLogsOfAnOrgStream/WebhookEventLogsOfAnOrgStream'

import ChatRoom from '../ChatRoom/ChatRoom'

// export const QUERY = gql`
//   query FindWebhookEventsOfAnOrgQuery($organizationId: String!) {
//     webhookEventLogsOfAnOrg: webhookEventLogsOfAnOrg(
//       organizationId: $organizationId
//     ) {
//       id
//       event
//       payload
//       source
//     }
//   }
// `

// In your cell query file
export const QUERY = gql`
  query FindLiveWebhookEventsOfAnOrgQuery($organizationId: String!) {
    liveWebhookEventLogsOfAnOrg: webhookEventLogsOfAnOrg(
      organizationId: $organizationId
    ) {
      id
      event
      payload
      source
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ liveWebhookEventLogsOfAnOrg, organizationId }) => {
  useEffect(() => {
    console.group('Live Webhook Logs Update')
    console.log('Current Logs Count:', liveWebhookEventLogsOfAnOrg.length)
    console.groupEnd()
  }, [liveWebhookEventLogsOfAnOrg])

  return (
    <div className="bg-black text-white">
      {/* <WebhookEventLogsOfAnOrg
        webhookEventLogsOfAnOrg={liveWebhookEventLogsOfAnOrg}
        organizationId={organizationId}
      /> */}
      {/* <ChatRoom chatRoomNumber="1" roomColor="blue" /> */}

      <WebhookEventLogsOfAnOrgStream
        initialLogs={[]}
        organizationId={organizationId}
      />
    </div>
  )
}
