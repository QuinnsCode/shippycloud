import { Link, routes } from '@redwoodjs/router'

import WebhookEventLogs from 'src/components/WebhookEventLog/WebhookEventLogs'

export const QUERY = gql`
  query FindWebhookEventLogs {
    webhookEventLogs {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No webhookEventLogs yet. '}
      <Link to={routes.newWebhookEventLog()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ webhookEventLogs }) => {
  return <WebhookEventLogs webhookEventLogs={webhookEventLogs} />
}
