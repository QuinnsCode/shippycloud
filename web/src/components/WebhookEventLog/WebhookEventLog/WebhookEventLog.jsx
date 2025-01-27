import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_WEBHOOK_EVENT_LOG_MUTATION = gql`
  mutation DeleteWebhookEventLogMutation($id: String!) {
    deleteWebhookEventLog(id: $id) {
      id
    }
  }
`

const WebhookEventLog = ({ webhookEventLog }) => {
  const [deleteWebhookEventLog] = useMutation(
    DELETE_WEBHOOK_EVENT_LOG_MUTATION,
    {
      onCompleted: () => {
        toast.success('WebhookEventLog deleted')
        navigate(routes.webhookEventLogs())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete webhookEventLog ' + id + '?')
    ) {
      deleteWebhookEventLog({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            WebhookEventLog {webhookEventLog.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{webhookEventLog.id}</td>
            </tr>
            <tr>
              <th>Organization id</th>
              <td>{webhookEventLog.organizationId}</td>
            </tr>
            <tr>
              <th>Event</th>
              <td>{webhookEventLog.event}</td>
            </tr>
            <tr>
              <th>Source</th>
              <td>{webhookEventLog.source}</td>
            </tr>
            <tr>
              <th>Payload</th>
              <td>{webhookEventLog.payload}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(webhookEventLog.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editWebhookEventLog({ id: webhookEventLog.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(webhookEventLog.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default WebhookEventLog
