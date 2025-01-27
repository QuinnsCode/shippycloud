import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/WebhookEventLog/WebhookEventLogsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_WEBHOOK_EVENT_LOG_MUTATION = gql`
  mutation DeleteWebhookEventLogMutation($id: String!) {
    deleteWebhookEventLog(id: $id) {
      id
    }
  }
`

const WebhookEventLogsList = ({ webhookEventLogs }) => {
  const [deleteWebhookEventLog] = useMutation(
    DELETE_WEBHOOK_EVENT_LOG_MUTATION,
    {
      onCompleted: () => {
        toast.success('WebhookEventLog deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
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
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Organization id</th>
            <th>Event</th>
            <th>Source</th>
            <th>Payload</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {webhookEventLogs.map((webhookEventLog) => (
            <tr key={webhookEventLog.id}>
              <td>{truncate(webhookEventLog.id)}</td>
              <td>{truncate(webhookEventLog.organizationId)}</td>
              <td>{truncate(webhookEventLog.event)}</td>
              <td>{truncate(webhookEventLog.source)}</td>
              <td>{truncate(webhookEventLog.payload)}</td>
              <td>{timeTag(webhookEventLog.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.webhookEventLog({ id: webhookEventLog.id })}
                    title={
                      'Show webhookEventLog ' + webhookEventLog.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editWebhookEventLog({ id: webhookEventLog.id })}
                    title={'Edit webhookEventLog ' + webhookEventLog.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete webhookEventLog ' + webhookEventLog.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(webhookEventLog.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WebhookEventLogsList
