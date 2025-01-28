import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Endpoint/EndpointsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_ENDPOINT_MUTATION = gql`
  mutation DeleteEndpointMutation($id: String!) {
    deleteEndpoint(id: $id) {
      id
    }
  }
`

const EndpointsList = ({ endpoints }) => {
  const [deleteEndpoint] = useMutation(DELETE_ENDPOINT_MUTATION, {
    onCompleted: () => {
      toast.success('Endpoint deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete endpoint ' + id + '?')) {
      deleteEndpoint({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Organization id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Endpoint type</th>
            <th>Created by user id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((endpoint) => (
            <tr key={endpoint.id}>
              <td>{truncate(endpoint.id)}</td>
              <td>{truncate(endpoint.organizationId)}</td>
              <td>{truncate(endpoint.name)}</td>
              <td>{truncate(endpoint.slug)}</td>
              <td>{truncate(endpoint.endpointType)}</td>
              <td>{truncate(endpoint.createdByUserId)}</td>
              <td>{timeTag(endpoint.createdAt)}</td>
              <td>{timeTag(endpoint.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.endpoint({ id: endpoint.id })}
                    title={'Show endpoint ' + endpoint.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editEndpoint({ id: endpoint.id })}
                    title={'Edit endpoint ' + endpoint.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete endpoint ' + endpoint.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(endpoint.id)}
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

export default EndpointsList
