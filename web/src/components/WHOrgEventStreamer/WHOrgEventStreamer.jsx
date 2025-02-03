import { useQuery } from '@redwoodjs/web'

import WebhookEventLogsOfAnOrgStream from 'src/components/WebhookEventLogsOfAnOrgStream/WebhookEventLogsOfAnOrgStream'

const INITIAL_LOGS_QUERY = gql`
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
const WhOrgEventStreamer = ({ organizationId }) => {
  const { data, loading, error } = useQuery(INITIAL_LOGS_QUERY, {
    variables: { organizationId },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const initialLogs = data?.liveWebhookEventLogsOfAnOrg || []

  return (
    <div className="">
      <WebhookEventLogsOfAnOrgStream
        initialLogs={initialLogs}
        organizationId={organizationId}
      />
    </div>
  )
}

export default WhOrgEventStreamer
