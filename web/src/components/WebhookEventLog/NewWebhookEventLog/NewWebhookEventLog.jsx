import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import WebhookEventLogForm from 'src/components/WebhookEventLog/WebhookEventLogForm'

const CREATE_WEBHOOK_EVENT_LOG_MUTATION = gql`
  mutation CreateWebhookEventLogMutation($input: CreateWebhookEventLogInput!) {
    createWebhookEventLog(input: $input) {
      id
    }
  }
`

const NewWebhookEventLog = () => {
  const [createWebhookEventLog, { loading, error }] = useMutation(
    CREATE_WEBHOOK_EVENT_LOG_MUTATION,
    {
      onCompleted: () => {
        toast.success('WebhookEventLog created')
        navigate(routes.webhookEventLogs())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createWebhookEventLog({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New WebhookEventLog</h2>
      </header>
      <div className="rw-segment-main">
        <WebhookEventLogForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewWebhookEventLog
