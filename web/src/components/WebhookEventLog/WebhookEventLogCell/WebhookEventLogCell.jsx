import WebhookEventLog from 'src/components/WebhookEventLog/WebhookEventLog'

export const QUERY = gql`
  query FindWebhookEventLogById($id: String!) {
    webhookEventLog: webhookEventLog(id: $id) {
      id
      organizationId
      event
      source
      payload
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>WebhookEventLog not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ webhookEventLog }) => {
  return <WebhookEventLog webhookEventLog={webhookEventLog} />
}
