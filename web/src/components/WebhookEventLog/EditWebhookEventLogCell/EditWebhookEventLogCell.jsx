import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WebhookEventLogForm from 'src/components/WebhookEventLog/WebhookEventLogForm'

export const QUERY = gql`
  query EditWebhookEventLogById($id: String!) {
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

const UPDATE_WEBHOOK_EVENT_LOG_MUTATION = gql`
  mutation UpdateWebhookEventLogMutation(
    $id: String!
    $input: UpdateWebhookEventLogInput!
  ) {
    updateWebhookEventLog(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ webhookEventLog }) => {
  const [updateWebhookEventLog, { loading, error }] = useMutation(
    UPDATE_WEBHOOK_EVENT_LOG_MUTATION,
    {
      onCompleted: () => {
        toast.success('WebhookEventLog updated')
        navigate(routes.webhookEventLogs())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateWebhookEventLog({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit WebhookEventLog {webhookEventLog?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <WebhookEventLogForm
          webhookEventLog={webhookEventLog}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
